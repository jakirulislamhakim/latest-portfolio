import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import { env } from '@/config/env';
import { buildContributionCalendar } from './build-contribution-calendar';
import { GITHUB_ACTIVITY_REVALIDATE_SECONDS, GITHUB_LOGIN, GITHUB_USER_AGENT } from './constants';
import type { TGithubActivityResult, TGithubContributionCalendar } from './types';

const CONTRIBUTION_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const contributionLevelSchema = z.enum([
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
]);

const contributionCalendarSchema = z.object({
  data: z
    .object({
      user: z
        .object({
          contributionsCollection: z.object({
            contributionCalendar: z.object({
              totalContributions: z.number(),
              weeks: z.array(
                z.object({
                  contributionDays: z.array(
                    z.object({
                      date: z.string(),
                      contributionCount: z.number(),
                      contributionLevel: contributionLevelSchema,
                    })
                  ),
                })
              ),
            }),
          }),
        })
        .nullable(),
    })
    .nullable(),
  errors: z.array(z.object({ message: z.string() })).optional(),
});

function buildGithubHeaders(token: string): Headers {
  return new Headers({
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': GITHUB_USER_AGENT,
  });
}

async function readJson(response: Response): Promise<unknown> {
  const payload: unknown = await response.json();
  return payload;
}

function readContributionCalendar(payload: unknown): TGithubContributionCalendar {
  const parsed = contributionCalendarSchema.safeParse(payload);

  if (!parsed.success || (parsed.data.errors && parsed.data.errors.length > 0)) {
    throw new Error('GitHub contribution response did not match the expected shape');
  }

  const calendar = parsed.data.data?.user?.contributionsCollection.contributionCalendar;

  if (!calendar) {
    throw new Error('GitHub contribution calendar was empty');
  }

  return calendar;
}

async function fetchContributionCalendar(token: string): Promise<TGithubContributionCalendar> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: buildGithubHeaders(token),
    body: JSON.stringify({
      query: CONTRIBUTION_QUERY,
      variables: { login: GITHUB_LOGIN },
    }),
    next: { revalidate: GITHUB_ACTIVITY_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub contribution request failed with status ${response.status}`);
  }

  return readContributionCalendar(await readJson(response));
}

export async function getGithubActivity(): Promise<TGithubActivityResult> {
  const token = env.GH_ACTIVITY_TOKEN;

  if (!token) {
    console.warn('GH_ACTIVITY_TOKEN is missing, so the contribution calendar cannot load.');
    return { status: 'error' };
  }

  try {
    const calendar = await fetchContributionCalendar(token);

    return {
      status: 'ready',
      activity: buildContributionCalendar(calendar, new Date()),
    };
  } catch (error) {
    Sentry.captureException(error);

    return { status: 'error' };
  }
}
