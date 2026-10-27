import type { TExperienceEntry } from '../types';

export const EXPERIENCE_CONTENT = {
  heading: 'Experience',
  intro:
    'Building real-world web applications, collaborating with a team, and developing full-stack solutions.',
  cvLabel: 'Download CV',
} as const;

export const EXPERIENCE_ENTRIES = [
  {
    id: 'ukil-bari',
    kind: 'job',
    title: 'Frontend Developer',
    subtitle: 'Ukil Bari · Team Development',
    startLabel: '05/2026',
    endLabel: 'Present',
    isCurrent: true,
    summary:
      'Work with a development team to build and improve public-facing pages and interactive features for the Ukil Bari platform.',
    highlights: [
      {
        id: 'ukil-public-pages',
        text: 'Build and improve pages for the platform, including About, Lawyers, and other public sections.',
      },
      {
        id: 'ukil-responsive-ui',
        text: 'Develop responsive layouts and interactive user experiences across mobile, tablet, and desktop.',
      },
      {
        id: 'ukil-teamwork',
        text: 'Collaborate through Git branches, pull requests, code reviews, and team development workflows.',
      },
    ],
    stack: [
      { id: 'nextjs', label: 'Next.js' },
      { id: 'react', label: 'React' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'tailwind', label: 'Tailwind CSS' },
      { id: 'shadcn', label: 'shadcn/ui' },
      { id: 'motion', label: 'Motion' },
    ],
  },
  {
    id: 'full-stack-projects',
    kind: 'freelance',
    title: 'Full-Stack Developer',
    subtitle: 'Independent Projects & Client Work',
    startLabel: '2025',
    endLabel: 'Present',
    isCurrent: true,
    summary:
      'Build full-stack web applications with a focus on practical features, maintainable code, REST APIs, and reliable data management.',
    highlights: [
      {
        id: 'fullstack-frontend',
        text: 'Develop responsive interfaces using React, Next.js, TypeScript, and modern UI tools.',
      },
      {
        id: 'fullstack-backend',
        text: 'Build REST APIs, authentication flows, and database-backed features using Node.js and Express.',
      },
      {
        id: 'fullstack-projects',
        text: 'Work on projects including a social platform, a sports facility booking system, a library management system, and an online nursery application.',
      },
    ],
    stack: [
      { id: 'react', label: 'React' },
      { id: 'nextjs', label: 'Next.js' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'nodejs', label: 'Node.js' },
      { id: 'express', label: 'Express.js' },
      { id: 'mongodb', label: 'MongoDB' },
      { id: 'postgresql', label: 'PostgreSQL' },
    ],
  },
] as const satisfies readonly TExperienceEntry[];
