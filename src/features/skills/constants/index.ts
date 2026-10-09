import { Code2, Monitor, Server, Wrench } from 'lucide-react';
import type { TSkillCategory } from '../types';

export const SKILLS_CONTENT = {
  eyebrow: 'Toolkit',
  heading: 'Skills & Technologies',
  intro: 'Languages, frontend, backend, and the tools I use to ship web applications.',
} as const;

export const SKILL_CATEGORIES = [
  {
    id: 'languages',
    name: 'Languages',
    icon: Code2,
    skills: [
      { id: 'javascript', name: 'JavaScript' },
      { id: 'typescript', name: 'TypeScript' },
      { id: 'cpp', name: 'C / C++ (STL)' },
      { id: 'html5', name: 'HTML5' },
      { id: 'css3', name: 'CSS3' },
      { id: 'sql', name: 'SQL' },
      { id: 'dsa', name: 'Data Structures & Algorithms' },
      { id: 'contests', name: 'Codeforces / CodeChef / LeetCode' },
      { id: 'problems-solved', name: '350+ problems solved' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: Monitor,
    skills: [
      { id: 'react', name: 'React.js' },
      { id: 'nextjs', name: 'Next.js' },
      { id: 'tailwind', name: 'Tailwind CSS' },
      { id: 'shadcn', name: 'shadcn/ui' },
      { id: 'antd', name: 'Ant Design' },
      { id: 'framer-motion', name: 'Framer Motion' },
      { id: 'react-hook-form', name: 'React Hook Form' },
      { id: 'redux-toolkit', name: 'Redux Toolkit' },
      { id: 'responsive', name: 'Responsive Design' },
      { id: 'a11y', name: 'Accessibility' },
      { id: 'seo', name: 'SEO & Web Performance' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: Server,
    skills: [
      { id: 'nodejs', name: 'Node.js' },
      { id: 'express', name: 'Express.js' },
      { id: 'rest', name: 'REST APIs' },
      { id: 'mongodb', name: 'MongoDB / Mongoose' },
      { id: 'postgresql', name: 'PostgreSQL / Prisma' },
      { id: 'zod', name: 'Zod' },
      { id: 'jwt', name: 'JWT Authentication' },
      { id: 'rbac', name: 'Role-Based Access Control' },
      { id: 'swagger', name: 'Swagger / OpenAPI' },
      { id: 'cloudinary', name: 'Cloudinary' },
      { id: 'email', name: 'Nodemailer / SendGrid' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools & DevOps',
    icon: Wrench,
    skills: [
      { id: 'git', name: 'Git / GitHub' },
      { id: 'package-managers', name: 'pnpm / npm' },
      { id: 'hosting', name: 'Vercel / Render' },
      { id: 'sentry', name: 'Sentry' },
      { id: 'eslint', name: 'ESLint' },
      { id: 'devtools', name: 'Chrome DevTools' },
      { id: 'postman', name: 'Postman' },
      { id: 'yaml', name: 'YAML' },
      { id: 'cursor', name: 'Cursor' },
      { id: 'nvm', name: 'nvm' },
    ],
  },
] as const satisfies readonly TSkillCategory[];
