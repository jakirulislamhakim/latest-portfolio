import { PROJECTS } from './constants';
import type { TProject } from './types';

export function getAllProjects(): readonly TProject[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): TProject | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 2): readonly TProject[] {
  return PROJECTS.filter((project) => project.slug !== slug).slice(0, limit);
}

export function getProjectSlugs(): readonly string[] {
  return PROJECTS.map((project) => project.slug);
}
