import Image from 'next/image';
import type { TProject } from '../types';
import { ProjectCtaRow } from './project-cta-row';
import { ProjectMetaLine } from './project-meta-line';
import { ProjectStackBadges } from './project-stack-badges';

type TProjectCardProps = {
  project: TProject;
};

export function ProjectCard({ project }: TProjectCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <div className="relative aspect-video w-full bg-muted">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <ProjectMetaLine tag={project.tag} ownership={project.ownership} />

        <h3 className="mt-3">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.pitch}</p>

        <ProjectStackBadges
          className="mt-3"
          items={project.stack}
          label={`${project.title} stack`}
        />
      </div>

      <ProjectCtaRow
        detailsHref={`/projects/${project.slug}`}
        liveUrl={project.liveUrl}
        githubUrl={project.githubUrl}
      />
    </article>
  );
}
