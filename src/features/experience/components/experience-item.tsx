import { PillList } from '@/components/shared/pill-list';
import { cn } from '@/lib/utils';
import type { TExperienceEntry, TExperienceKind } from '../types';

type TExperienceItemProps = {
  entry: TExperienceEntry;
  isFirst: boolean;
  isLast: boolean;
};

function kindLabel(kind: TExperienceKind): string {
  if (kind === 'job') {
    return 'Employment';
  }

  return 'Freelance';
}

export function ExperienceItem({ entry, isFirst, isLast }: TExperienceItemProps) {
  const dateLabel = `${entry.startLabel} — ${entry.endLabel}`;

  return (
    <li className="grid grid-cols-[12px_minmax(0,1fr)] gap-3">
      <div className="relative flex justify-center" aria-hidden="true">
        {isLast ? (
          <>
            {/* Solid stem from the previous item down to this node */}
            {!isFirst ? (
              <span className="absolute top-0 left-1/2 h-5 w-px -translate-x-1/2 bg-border" />
            ) : null}
            {/* Fades out below the node so the timeline reads as finished */}
            <span className="absolute top-[1.875rem] bottom-0 left-1/2 w-px -translate-x-1/2 bg-linear-to-b from-border to-transparent" />
          </>
        ) : (
          <span
            className={cn(
              'absolute left-1/2 w-px -translate-x-1/2 bg-border',
              isFirst ? 'top-5' : 'top-0',
              'bottom-0'
            )}
          />
        )}
        <span
          className={cn(
            'relative mt-5 size-2.5 shrink-0 rounded-full border-2',
            entry.isCurrent ? 'border-primary bg-primary' : 'border-muted-foreground bg-card'
          )}
        />
      </div>

      <div className="pb-4">
        <article className="rounded-xl border border-border bg-card p-4 shadow-xs md:p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-muted-foreground">{kindLabel(entry.kind)}</p>
            <p className="text-right text-sm text-muted-foreground">{dateLabel}</p>
          </div>

          <h3 className="mt-3">{entry.title}</h3>
          {entry.href ? (
            <a
              href={entry.href}
              className="mt-1 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {entry.subtitle}
            </a>
          ) : (
            <p className="mt-1 text-sm font-medium">{entry.subtitle}</p>
          )}

          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{entry.summary}</p>

          <ul className="mt-3">
            {entry.highlights.map((highlight) => (
              <li
                key={highlight.id}
                className="flex items-start gap-2 border-t border-border py-2 text-base leading-relaxed"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-2 shrink-0 rounded-full bg-primary/70"
                />
                <span>{highlight.text}</span>
              </li>
            ))}
          </ul>

          {/* <p className="mt-4 text-sm text-muted-foreground">Tools</p> */}
          <div className="mt-4 border-y border-border py-0.5" />
          <PillList className="mt-2" items={entry.stack} label="Tools" />
        </article>
      </div>
    </li>
  );
}
