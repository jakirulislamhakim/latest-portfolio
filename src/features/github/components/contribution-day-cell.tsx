import { cn } from '@/lib/utils';
import type { TContributionLevel } from '../types';

const CONTRIBUTION_LEVEL_CLASS = {
  0: 'bg-muted',
  1: 'bg-primary/25 dark:bg-primary/35',
  2: 'bg-primary/50 dark:bg-primary/55',
  3: 'bg-primary/75 dark:bg-primary/80',
  4: 'bg-primary',
} as const satisfies Record<TContributionLevel, string>;

const CONTRIBUTION_CELL_CLASS = 'size-2.5 shrink-0 rounded-xs';

type TContributionDayCellProps = {
  title: string;
  level: TContributionLevel;
};

export function ContributionDayCell({ title, level }: TContributionDayCellProps) {
  return (
    <span title={title} className={cn(CONTRIBUTION_CELL_CLASS, CONTRIBUTION_LEVEL_CLASS[level])} />
  );
}

export function ContributionLevelSwatch({ level }: { level: TContributionLevel }) {
  return (
    <span
      aria-hidden="true"
      className={cn(CONTRIBUTION_CELL_CLASS, CONTRIBUTION_LEVEL_CLASS[level])}
    />
  );
}
