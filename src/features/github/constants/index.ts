import type { TGithubActivityStat } from '../types';

export const GITHUB_ACTIVITY_CONTENT = {
  heading: 'GitHub activity',
  subheadline: 'Contributions in the last year.',
  fallback: 'GitHub activity is unavailable right now.',
  fallbackLinkLabel: 'View the GitHub profile',
  ctaLabel: 'Visit GitHub profile',
  ctaAriaLabel: 'Visit Jakirul Islam Hakim on GitHub',
  lessLabel: 'Less',
  moreLabel: 'More',
  loadingLabel: 'Loading GitHub activity',
} as const;

// Public login for this feature. Kept here so the feature does not import hero internals.
export const GITHUB_LOGIN = 'jakirulislamhakim';

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_LOGIN}`;

export const GITHUB_USER_AGENT = 'jakirulislamhakim-portfolio';

export const GITHUB_ACTIVITY_REVALIDATE_SECONDS = 3600;

export const DAYS_PER_WEEK = 7;

export const CONTRIBUTION_YEAR_WEEK_COUNT = 53;

export const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export const CONTRIBUTION_DAY_ROWS = [
  { id: 'sun', label: '' },
  { id: 'mon', label: 'Mon' },
  { id: 'tue', label: '' },
  { id: 'wed', label: 'Wed' },
  { id: 'thu', label: '' },
  { id: 'fri', label: 'Fri' },
  { id: 'sat', label: '' },
] as const;

export const GITHUB_ACTIVITY_STATS = [
  { id: 'contributions', label: 'Contributions', unit: '' },
  { id: 'current-streak', label: 'Current streak', unit: 'days' },
  { id: 'longest-streak', label: 'Longest streak', unit: 'days' },
] as const satisfies readonly TGithubActivityStat[];
