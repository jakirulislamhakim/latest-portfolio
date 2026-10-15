import { SectionLayout } from '@/components/layout/section-layout';
import { GITHUB_ACTIVITY_CONTENT, GITHUB_PROFILE_URL } from '../constants';
import { GithubActivityHeading } from './github-activity-heading';

export function GithubActivityFallback() {
  return (
    <SectionLayout id="activity" aria-labelledby="activity-heading">
      <GithubActivityHeading />
      <p className="mt-8 text-center text-base leading-relaxed text-muted-foreground">
        {GITHUB_ACTIVITY_CONTENT.fallback}{' '}
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
        >
          {GITHUB_ACTIVITY_CONTENT.fallbackLinkLabel}
        </a>
      </p>
    </SectionLayout>
  );
}
