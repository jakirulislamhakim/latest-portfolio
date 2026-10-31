import { SectionLayout } from '@/components/layout/section-layout';
import { PROJECTS_CONTENT } from '../constants';
import { ProjectsClientCta } from './projects-client-cta';
import { ProjectsShowcase } from './projects-showcase';

export function ProjectsSection() {
  return (
    <SectionLayout id="projects" aria-labelledby="projects-heading">
      <div>
        <h2 id="projects-heading" className="text-center">
          {PROJECTS_CONTENT.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-prose text-center text-base leading-relaxed text-muted-foreground">
          {PROJECTS_CONTENT.intro}
        </p>
      </div>

      <ProjectsShowcase />
      <ProjectsClientCta />
    </SectionLayout>
  );
}
