import { cn } from '@/lib/utils';
import { PROJECT_OWNERSHIP_LABELS, PROJECT_TAG_LABELS, PROJECTS_CONTENT } from '../constants';
import type { TProjectOwnership, TProjectTag } from '../types';

type TProjectMetaLineProps = {
  tag: TProjectTag;
  ownership: TProjectOwnership;
  className?: string;
};

/**
 * Card meta row: work type, then only the real ownership (Solo or Team).
 * Text-only — no pills, no faded alternate option.
 */
export function ProjectMetaLine({ tag, ownership, className }: TProjectMetaLineProps) {
  const tagLabel = PROJECT_TAG_LABELS[tag];
  const ownershipLabel = PROJECT_OWNERSHIP_LABELS[ownership];

  return (
    <p
      aria-label={`${tagLabel}. ${PROJECTS_CONTENT.ownershipLabel}: ${ownershipLabel}`}
      className={cn(
        'flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-xs tracking-[0.14em] uppercase',
        className
      )}
    >
      <span className="font-semibold text-foreground">{tagLabel}</span>

      <span aria-hidden="true" className="inline-block size-1 rotate-45 bg-primary" />

      <span className="font-medium text-muted-foreground">{ownershipLabel}</span>
    </p>
  );
}
