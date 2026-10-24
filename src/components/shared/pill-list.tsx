import { cn } from '@/lib/utils';

export type TPillItem = {
  id: string;
  label: string;
};

type TPillListProps = {
  items: readonly TPillItem[];
  label: string;
  className?: string;
};

const PILL_CLASS_NAME =
  'rounded-full border border-border bg-muted px-3 py-1.5 text-xs leading-snug text-foreground md:text-sm';

export function PillList({ items, label, className }: TPillListProps) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap items-center gap-2', className)}>
      {items.map((item) => (
        <Pill key={item.id} label={item.label} />
      ))}
    </ul>
  );
}

export function Pill({ label }: { label: string }) {
  return <span className={PILL_CLASS_NAME}>{label}</span>;
}
