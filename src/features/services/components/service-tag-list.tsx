import type { TServiceTag } from '../types';

type TServiceTagListProps = {
  tags: readonly TServiceTag[];
};

export function ServiceTagList({ tags }: TServiceTagListProps) {
  return (
    <ul
      aria-label="Service categories"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {tags.map((tag) => (
        <li
          key={tag.id}
          className="rounded-full border border-border bg-muted px-3 py-1.5 text-sm leading-snug text-foreground"
        >
          {tag.label}
        </li>
      ))}
    </ul>
  );
}
