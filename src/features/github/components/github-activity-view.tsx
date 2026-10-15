import { SectionLayout } from '@/components/layout/section-layout';
import { GITHUB_ACTIVITY_STATS } from '../constants';
import type { TGithubActivity, TGithubActivityStatId } from '../types';
import { ContributionCalendar } from './contribution-calendar';
import { ContributionStat } from './contribution-stat';
import { GithubActivityCta } from './github-activity-cta';
import { GithubActivityHeading } from './github-activity-heading';

type TGithubActivityViewProps = {
  activity: TGithubActivity;
};

function statValue(id: TGithubActivityStatId, activity: TGithubActivity): number {
  switch (id) {
    case 'contributions':
      return activity.totalContributions;
    case 'current-streak':
      return activity.currentStreak;
    case 'longest-streak':
      return activity.longestStreak;
  }
}

export function GithubActivityView({ activity }: TGithubActivityViewProps) {
  return (
    <SectionLayout id="activity" aria-labelledby="activity-heading">
      <GithubActivityHeading />
      <ul aria-label="GitHub activity stats" className="mt-8 flex flex-row gap-3 md:gap-4">
        {GITHUB_ACTIVITY_STATS.map((stat) => (
          <ContributionStat
            key={stat.id}
            value={statValue(stat.id, activity)}
            label={stat.label}
            unit={stat.unit}
          />
        ))}
      </ul>
      <ContributionCalendar monthLabels={activity.monthLabels} weeks={activity.weeks} />
      <GithubActivityCta />
    </SectionLayout>
  );
}
