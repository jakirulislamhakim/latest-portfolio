import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PROJECT_TAG_LABELS, PROJECTS_CONTENT } from '../constants';
import type { TProject } from '../types';

type TProjectRelatedListProps = {
  projects: readonly TProject[];
};

type TProjectRelatedItemProps = {
  project: TProject;
};

function ProjectRelatedItem({ project }: TProjectRelatedItemProps) {
  const tagLabel = PROJECT_TAG_LABELS[project.tag];

  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="group flex min-h-11 items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-xs transition-colors hover:border-primary/40 hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:p-5"
      >
        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted md:size-24">
          <Image
            src={project.image.src}
            alt=""
            fill
            className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:scale-105"
            sizes="96px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {tagLabel}
          </p>
          <h3 className="mt-1 transition-colors group-hover:text-primary">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.pitch}
          </p>
        </div>

        <ArrowUpRight
          className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-primary motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}

export function ProjectRelatedList({ projects }: TProjectRelatedListProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-projects-heading" className="mt-12">
      <h2 id="related-projects-heading">{PROJECTS_CONTENT.relatedHeading}</h2>
      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectRelatedItem key={project.id} project={project} />
        ))}
      </ul>
    </section>
  );
}
