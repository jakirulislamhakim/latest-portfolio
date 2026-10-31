import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getProjectBySlug,
  getProjectSlugs,
  getRelatedProjects,
  ProjectDetail,
} from '@/features/projects';

type TProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project not found',
    };
  }

  return {
    title: `${project.title} | Jakirul Islam Hakim`,
    description: project.pitch,
  };
}

export default async function ProjectPage({ params }: TProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.slug);

  return <ProjectDetail project={project} relatedProjects={relatedProjects} />;
}
