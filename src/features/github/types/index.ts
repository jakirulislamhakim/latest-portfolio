export type TContributionLevel = 0 | 1 | 2 | 3 | 4;

export type TGithubActivityStatId = 'contributions' | 'current-streak' | 'longest-streak';

export type TGithubActivityStat = {
  id: TGithubActivityStatId;
  label: string;
  unit: '' | 'days';
};

export type TContributionLevelName =
  'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';

export type TGithubContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: TContributionLevelName;
};

export type TGithubContributionWeek = {
  contributionDays: TGithubContributionDay[];
};

export type TGithubContributionCalendar = {
  totalContributions: number;
  weeks: TGithubContributionWeek[];
};

export type TContributionDay = {
  date: string;
  count: number;
  level: TContributionLevel;
  title: string;
};

export type TContributionWeek = {
  id: string;
  days: TContributionDay[];
};

export type TContributionMonthLabel = {
  id: string;
  label: string;
};

export type TGithubActivity = {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  monthLabels: readonly TContributionMonthLabel[];
  weeks: readonly TContributionWeek[];
};

export type TGithubActivityResult =
  { status: 'ready'; activity: TGithubActivity } | { status: 'error' };
