import { DAYS_PER_WEEK, SHORT_MONTHS } from './constants';
import type {
  TContributionDay,
  TContributionLevel,
  TContributionLevelName,
  TContributionMonthLabel,
  TContributionWeek,
  TGithubActivity,
  TGithubContributionCalendar,
  TGithubContributionDay,
} from './types';

const CONTRIBUTION_LEVEL_BY_NAME = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const satisfies Record<TContributionLevelName, TContributionLevel>;

function utcTodayKey(now: Date): string {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    .toISOString()
    .slice(0, 10);
}

function monthName(dateKey: string): string {
  const monthNumber = Number(dateKey.slice(5, 7));
  return SHORT_MONTHS[monthNumber - 1] ?? '';
}

function formatDayTitle(dateKey: string, count: number): string {
  const month = monthName(dateKey);
  const dayNumber = Number(dateKey.slice(8, 10));
  const year = dateKey.slice(0, 4);
  const noun = count === 1 ? 'contribution' : 'contributions';

  if (month.length === 0 || Number.isNaN(dayNumber)) {
    return `${dateKey}: ${count} ${noun}`;
  }

  return `${month} ${dayNumber}, ${year}: ${count} ${noun}`;
}

function toContributionDay(day: TGithubContributionDay): TContributionDay {
  return {
    date: day.date,
    count: day.contributionCount,
    level: CONTRIBUTION_LEVEL_BY_NAME[day.contributionLevel],
    title: formatDayTitle(day.date, day.contributionCount),
  };
}

function firstDay(days: readonly TContributionDay[]): TContributionDay {
  const day = days[0];

  if (!day) {
    throw new Error('GitHub contribution week did not include a day');
  }

  return day;
}

function monthLabelForWeek(days: readonly TContributionDay[], weekIndex: number): string {
  const openingDay = firstDay(days);
  const firstOfMonth = days.find((day) => day.date.endsWith('-01'));

  if (firstOfMonth) {
    return monthName(firstOfMonth.date);
  }

  if (weekIndex === 0) {
    return monthName(openingDay.date);
  }

  return '';
}

function computeStreaks(counts: readonly number[]): {
  currentStreak: number;
  longestStreak: number;
} {
  let longestStreak = 0;
  let run = 0;

  for (const count of counts) {
    if (count > 0) {
      run += 1;
      if (run > longestStreak) {
        longestStreak = run;
      }
    } else {
      run = 0;
    }
  }

  let currentStreak = 0;
  let index = counts.length - 1;
  const lastCount = counts[index];

  if (lastCount === 0) {
    index -= 1;
  }

  while (index >= 0) {
    const count = counts[index];

    if (count === undefined || count === 0) {
      break;
    }

    currentStreak += 1;
    index -= 1;
  }

  return { currentStreak, longestStreak };
}

export function buildContributionCalendar(
  calendar: TGithubContributionCalendar,
  now: Date
): TGithubActivity {
  const todayKey = utcTodayKey(now);
  const weeks: TContributionWeek[] = calendar.weeks.map((week) => {
    const dayCount = week.contributionDays.length;

    if (dayCount < 1 || dayCount > DAYS_PER_WEEK) {
      throw new Error('GitHub contribution week did not include a valid set of days');
    }

    const days = week.contributionDays.map((day) => toContributionDay(day));

    return {
      id: firstDay(days).date,
      days,
    };
  });

  const monthLabels: TContributionMonthLabel[] = weeks.map((week, weekIndex) => ({
    id: week.id,
    label: monthLabelForWeek(week.days, weekIndex),
  }));

  const pastCounts = weeks
    .flatMap((week) => week.days)
    .filter((day) => day.date <= todayKey)
    .map((day) => day.count);
  const streaks = computeStreaks(pastCounts);

  return {
    totalContributions: calendar.totalContributions,
    currentStreak: streaks.currentStreak,
    longestStreak: streaks.longestStreak,
    monthLabels,
    weeks,
  };
}
