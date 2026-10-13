import type { TAboutParagraph, TAboutStat } from '../types';

export const ABOUT_CONTENT = {
  heading: 'About me',
  subheadline: 'I build reliable web apps with a clear structure and a careful interface.',
} as const;

export const ABOUT_PARAGRAPHS = [
  {
    id: 'who',
    text: 'I am a full-stack developer. I build modern web apps with the MERN stack, TypeScript, and Next.js, and I keep my practice sharp by solving problems.I am a full-stack developer. I build modern web apps with the MERN stack, TypeScript, and Next.js, and I keep my practice sharp by solving problems.I am a full-stack developer. I build modern web apps with the MERN stack, TypeScript, and Next.js, and I keep my practice sharp by solving problems.',
  },
  {
    id: 'problem',
    text: 'The problem I take on is software that is hard to use or hard to change. The value I bring is clean architecture and a careful interface, so the product stays clear for the people who use it.I am a full-stack developer. I build modern web apps with the MERN stack, TypeScript, and Next.js, and I keep my practice sharp by solving problems.',
  },
  {
    id: 'work',
    text: 'I am currently employed as a software developer. I bring that same focus on clear structure to the work I do there.I am a full-stack developer. I build modern web apps with the MERN stack, TypeScript, and Next.js, and I keep my practice sharp by solving problems.',
  },
] as const satisfies readonly TAboutParagraph[];

export const ABOUT_STATS = [
  {
    id: 'experience',
    label: 'Experience',
    // Years are not on the site or the CV, so the number stays empty.
    value: '1+',
  },
  {
    id: 'projects',
    label: 'Projects completed',
    // A project count is not on the site or the CV, so the number stays empty.
    value: '10+',
  },
  {
    id: 'problems',
    label: 'Problems solved',
    value: '350+',
  },
  {
    id: 'platforms',
    label: 'Coding platforms',
    value: '3',
  },
] as const satisfies readonly TAboutStat[];
