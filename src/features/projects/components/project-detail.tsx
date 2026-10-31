import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { Pill } from '@/components/shared/pill-list';
import { SocialIcon } from '@/components/shared/social-icon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PROJECT_STATUS_LABELS, PROJECTS_CONTENT } from '../constants';
import type { TProject } from '../types';
import { ProjectDetailTabs } from './project-detail-tabs';
import { ProjectMetaLine } from './project-meta-line';
import { ProjectRelatedList } from './project-related-list';
import { ProjectStackBadges } from './project-stack-badges';

type TProjectDetailProps = {
  project: TProject;
  relatedProjects: readonly TProject[];
};

type TInfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: TInfoRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 py-3 last:border-b-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function ProjectDetail({ project, relatedProjects }: TProjectDetailProps) {
  const statusLabel = PROJECT_STATUS_LABELS[project.status];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-3 pb-10 md:px-6 md:pb-14 lg:px-8">
      <Link
        href="/#projects"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {PROJECTS_CONTENT.backLabel}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1>{project.title}</h1>
        {project.featured ? <Pill label={PROJECTS_CONTENT.featuredLabel} /> : null}
        <Pill label={statusLabel} />
      </div>

      <ProjectMetaLine className="mt-3" tag={project.tag} ownership={project.ownership} />

      <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
        {project.pitch}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), 'min-h-11')}
          >
            <LinkIcon className="size-4" aria-hidden="true" />
            {PROJECTS_CONTENT.liveDemoLabel}
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'outline' }), 'min-h-11')}
          >
            <SocialIcon id="github" className="size-4" />
            {PROJECTS_CONTENT.sourceCodeLabel}
          </a>
        ) : null}
      </div>

      <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted shadow-xs">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 72rem"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
        <div>
          <div className="mb-6 space-y-3 rounded-xl border border-border/50 bg-muted/40 p-4 md:p-5">
            <div>
              <p className="text-xs font-semibold tracking-wide text-foreground uppercase">
                {PROJECTS_CONTENT.problemLabel}
              </p>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                {project.problem}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-foreground uppercase">
                {PROJECTS_CONTENT.outcomeLabel}
              </p>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                {project.outcome}
              </p>
            </div>
          </div>

          <ProjectDetailTabs
            overview={project.overview}
            challenges={project.challenges}
            solutions={project.solutions}
            results={project.results}
          />
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-4 shadow-xs md:p-5">
            <p className="text-sm font-semibold text-foreground">
              {PROJECTS_CONTENT.projectInfoHeading}
            </p>
            <dl className="mt-2">
              <InfoRow label={PROJECTS_CONTENT.typeLabel} value={project.projectType} />
              <InfoRow label={PROJECTS_CONTENT.clientLabel} value={project.clientLabel} />
              <InfoRow label={PROJECTS_CONTENT.durationLabel} value={project.durationLabel} />
              <InfoRow label={PROJECTS_CONTENT.roleLabel} value={project.role} />
            </dl>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {PROJECTS_CONTENT.liveDemoLabel}
              </a>
            ) : null}
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-xs md:p-5">
            <p className="text-sm font-semibold text-foreground">{PROJECTS_CONTENT.stackHeading}</p>
            <ProjectStackBadges
              className="mt-3"
              items={project.stack}
              label={`${project.title} stack`}
            />
          </div>
        </aside>
      </div>

      <ProjectRelatedList projects={relatedProjects} />
    </div>
  );
}
