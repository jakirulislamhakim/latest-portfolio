import { cn } from '@/lib/utils';
import type { TAboutStat } from '../types';

type TAboutStatValueProps = {
  value: string;
};

function AboutStatValue({ value }: TAboutStatValueProps) {
  if (value.length === 0) {
    return null;
  }

  return <p className="font-heading text-2xl font-bold text-primary">{value}</p>;
}

type TAboutStatCardProps = {
  stat: TAboutStat;
};

export function AboutStatCard({ stat }: TAboutStatCardProps) {
  const hasValue = stat.value.length > 0;

  return (
    <li className="flex min-h-24 flex-col items-center justify-center rounded-xl border border-border/50 bg-card px-3 py-4 text-center shadow-sm">
      <AboutStatValue value={stat.value} />
      <p
        className={cn(
          'text-sm leading-relaxed',
          hasValue ? 'mt-1 text-muted-foreground' : 'font-medium text-foreground'
        )}
      >
        {stat.label}
      </p>
    </li>
  );
}
