import { cn } from '@/lib/utils';
import type { TProjectStackItem } from '../types';

type TProjectStackBadgesProps = {
  items: readonly TProjectStackItem[];
  label: string;
  className?: string;
};

export function ProjectStackBadges({ items, label, className }: TProjectStackBadgesProps) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {items.map((item) => (
        <li key={item.id}>
          <span className="inline-flex items-center rounded-md border border-border bg-muted px-1.5 py-1 text-xs leading-none text-foreground">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
