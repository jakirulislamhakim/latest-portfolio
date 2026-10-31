'use client';

import { useState } from 'react';
import { PROJECTS, PROJECTS_CONTENT, type TProjectFilterId } from '../constants';
import { ProjectCard } from './project-card';
import { ProjectsFilter } from './projects-filter';

function filterProjects(filterId: TProjectFilterId) {
  if (filterId === 'all') {
    return PROJECTS;
  }

  return PROJECTS.filter((project) => project.tag === filterId);
}

export function ProjectsShowcase() {
  const [filterId, setFilterId] = useState<TProjectFilterId>('all');
  const visibleProjects = filterProjects(filterId);

  return (
    <div className="mt-8">
      <ProjectsFilter value={filterId} onChange={setFilterId} />

      {visibleProjects.length === 0 ? (
        <p className="mt-8 text-center text-base text-muted-foreground">
          {PROJECTS_CONTENT.emptyFilter}
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <li key={project.id} className="h-full">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
