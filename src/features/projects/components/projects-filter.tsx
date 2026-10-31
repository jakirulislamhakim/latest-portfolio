'use client';

import { cn } from '@/lib/utils';
import { PROJECT_FILTERS, PROJECTS_CONTENT, type TProjectFilterId } from '../constants';

type TProjectsFilterProps = {
  value: TProjectFilterId;
  onChange: (next: TProjectFilterId) => void;
};

type TProjectsFilterButtonProps = {
  filterId: TProjectFilterId;
  label: string;
  isActive: boolean;
  onSelect: (next: TProjectFilterId) => void;
};

function ProjectsFilterButton({ filterId, label, isActive, onSelect }: TProjectsFilterButtonProps) {
  function handleClick() {
    onSelect(filterId);
  }

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={handleClick}
      className={cn(
        'min-h-11 border-b-2 px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        isActive
          ? 'border-primary text-foreground'
          : 'border-transparent text-muted-foreground hover:text-foreground'
      )}
    >
      {label}
    </button>
  );
}

export function ProjectsFilter({ value, onChange }: TProjectsFilterProps) {
  return (
    <div
      role="group"
      aria-label={PROJECTS_CONTENT.filterLabel}
      className="mx-auto flex w-full max-w-xl flex-wrap items-center justify-center gap-1 border-b border-border pb-px"
    >
      {PROJECT_FILTERS.map((filter) => (
        <ProjectsFilterButton
          key={filter.id}
          filterId={filter.id}
          label={filter.label}
          isActive={filter.id === value}
          onSelect={onChange}
        />
      ))}
    </div>
  );
}
