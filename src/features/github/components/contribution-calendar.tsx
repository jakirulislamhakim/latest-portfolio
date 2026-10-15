import { GITHUB_ACTIVITY_CONTENT, CONTRIBUTION_DAY_ROWS } from '../constants';
import type { TContributionMonthLabel, TContributionWeek } from '../types';
import { ContributionDayCell, ContributionLevelSwatch } from './contribution-day-cell';

const LEGEND_LEVELS = [0, 1, 2, 3, 4] as const;

type TContributionCalendarProps = {
  monthLabels: readonly TContributionMonthLabel[];
  weeks: readonly TContributionWeek[];
};

export function ContributionCalendar({ monthLabels, weeks }: TContributionCalendarProps) {
  return (
    <div className="mt-8 max-w-full overflow-x-auto">
      <div className="w-max">
        <div aria-hidden="true" className="flex gap-2">
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
          <div>
            <div className="mb-1 flex h-3 gap-0.5">
              {monthLabels.map((month) => (
                <span
                  key={month.id}
                  className="w-2.5 shrink-0 text-xs leading-none whitespace-nowrap text-muted-foreground"
                >
                  {month.label}
                </span>
              ))}
            </div>
            <div className="flex gap-0.5">
              {weeks.map((week) => (
                <div key={week.id} className="flex flex-col gap-0.5">
                  {week.days.map((day) => (
                    <ContributionDayCell key={day.date} title={day.title} level={day.level} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end gap-1">
          <span className="text-xs text-muted-foreground">{GITHUB_ACTIVITY_CONTENT.lessLabel}</span>
          {LEGEND_LEVELS.map((level) => (
            <ContributionLevelSwatch key={level} level={level} />
          ))}
          <span className="text-xs text-muted-foreground">{GITHUB_ACTIVITY_CONTENT.moreLabel}</span>
        </div>
      </div>
    </div>
  );
}
