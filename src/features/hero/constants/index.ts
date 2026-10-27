import { SITE, SOCIAL_LINKS } from '@/config/site';
import type { THeroCodeSnippet, THeroTechBadge } from '../types';

export const HERO_CONTENT = {
  greeting: "Hi, I'm",
  name: 'Jakirul Islam Hakim',
  bio: 'Passionate Full Stack Developer with expertise in MERN stack. I love building modern, scalable, user-friendly, high-performance web applications that solve real-world problems.',
  badge: 'Available for work',
  location: 'Dhaka, Bangladesh',
  designations: 'Software Developer',
  primaryCta: {
    label: 'View My Work',
    href: '#projects',
  },
  secondaryCta: {
    label: 'Download CV',
    href: SITE.cvHref,
  },
  socialsLabel: 'Follow Me',
} as const;

export const HERO_CODE_SNIPPET = {
  variableName: 'developer',
  properties: [
    { key: 'name', value: '"Jakirul Islam Hakim"' },
    { key: 'passion', value: '"Building amazing web apps"' },
    { key: 'stack', value: '["MERN", "TypeScript", "Next.js"]' },
    { key: 'focus', value: '"Clean Code & Great UX"' },
    { key: 'status', value: '"Open to Work"' },
  ],
} as const satisfies THeroCodeSnippet;

export const HERO_SOCIAL_LINKS = SOCIAL_LINKS;

export const HERO_TECH_BADGES = [
  {
    id: 'typescript',
    name: 'TypeScript',
    src: '/images/hero-icon/typescript.jpg',
    positionClassName: 'top-[32%] -left-11 md:top-[36%] md:-left-14',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    src: '/images/hero-icon/nextjs.jpg',
    positionClassName: '-top-8 left-[10%] md:-top-10 md:left-[10%]',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    src: '/images/hero-icon/postgreesql.jpg',
    positionClassName: 'top-[32%] -right-11 md:top-[36%] md:-right-14',
  },
  {
    id: 'express',
    name: 'Express.js',
    src: '/images/hero-icon/express-js.jpg',
    positionClassName: '-top-8 right-[10%] md:-top-10 md:right-[10%]',
  },
] as const satisfies readonly THeroTechBadge[];
