type TContributionStatProps = {
  value: number;
  label: string;
  unit: string;
};

export function ContributionStat({ value, label, unit }: TContributionStatProps) {
  const formattedValue = new Intl.NumberFormat('en-US').format(value);

  return (
    <li className="f flex min-h-16 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-border/50 bg-card px-1.5 py-3 text-center shadow-sm md:min-h-24 md:flex-row md:gap-3 md:px-3 md:py-4">
      <p className="shrink-0 font-heading text-xl font-bold text-primary md:text-2xl">
        {formattedValue}
      </p>
      <p className="text-xs leading-snug text-muted-foreground md:text-sm">
        {label}
        {unit.length > 0 ? <span className="sr-only">, {unit}</span> : null}
      </p>
    </li>
  );
}
