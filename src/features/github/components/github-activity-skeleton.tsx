import { SectionLayout } from '@/components/layout/section-layout';
import {
  CONTRIBUTION_DAY_ROWS,
  CONTRIBUTION_YEAR_WEEK_COUNT,
  GITHUB_ACTIVITY_CONTENT,
  GITHUB_ACTIVITY_STATS,
} from '../constants';
import { GithubActivityHeading } from './github-activity-heading';

const SKELETON_WEEK_IDS = Array.from(
  { length: CONTRIBUTION_YEAR_WEEK_COUNT },
  (_, weekIndex) => `skeleton-week-${weekIndex + 1}`
);

export function GithubActivitySkeleton() {
  return (
    <SectionLayout id="activity" aria-labelledby="activity-heading" aria-busy="true">
      <p className="sr-only">{GITHUB_ACTIVITY_CONTENT.loadingLabel}</p>
      <GithubActivityHeading />
      <ul aria-hidden="true" className="mt-8 flex flex-row gap-3 md:gap-4">
        {GITHUB_ACTIVITY_STATS.map((stat) => (
          <li
            key={stat.id}
            className="flex min-h-16 min-w-0 flex-1 flex-row items-center justify-center gap-1 rounded-xl border border-border/50 bg-card px-1.5 py-3 md:min-h-24 md:gap-3 md:px-3 md:py-4"
          >
            <span className="h-6 w-6 shrink-0 rounded-md bg-muted motion-safe:animate-pulse md:h-7 md:w-8" />
            <span className="text-xs leading-snug text-muted-foreground md:text-sm">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-8 max-w-full overflow-x-auto">
        <div className="flex w-max gap-2">
          <div className="flex w-8 shrink-0 flex-col">
            <span className="mb-1 h-3" />
            <div className="flex flex-col gap-0.5">
              {CONTRIBUTION_DAY_ROWS.map((row) => (
                <span
                  key={row.id}
                  className="flex h-2.5 items-center text-xs leading-none text-muted-foreground"
                >
                  {row.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-0.5">
            {SKELETON_WEEK_IDS.map((weekId) => (
              <div key={weekId} className="flex flex-col gap-0.5">
                {CONTRIBUTION_DAY_ROWS.map((row) => (
                  <span
                    key={`${weekId}-${row.id}`}
                    className="size-2.5 shrink-0 rounded-xs bg-muted motion-safe:animate-pulse"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
