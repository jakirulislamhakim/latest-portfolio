import type { TServiceTag, TServicesImage } from '../types';

export const SERVICES_CONTENT = {
  heading: 'Web Development Services',
  subHeading: 'From business ideas to working web solutions.',
  pitch:
    'I help clients ship full products without needing to hire separate frontend and backend specialists. By working with one full-stack developer, you benefit from clearer ownership and save 3–4x compared to hiring for separate roles.',
  description:
    'I help turn your ideas into useful, modern web applications that fit your business needs. From business websites and online stores to marketplaces, dashboards, and custom business software, I build solutions that make your work easier. Whether you want to start a new project, improve your existing website, or manage your business more efficiently, I can help with everything from the user interface to the backend and database. I focus on clean code, good performance, easy-to-use designs, and reliable functionality. I also build websites in both Bangla and English to help you reach more people',
} as const;

export const SERVICES_IMAGE = {
  src: '/images/services/services.png',
  alt: 'Illustration of a full-stack developer connecting frontend interfaces with backend servers and data',
  width: 444,
  height: 400,
} as const satisfies TServicesImage;

export const SERVICE_TAGS = [
  { id: 'full-stack', label: 'Full-Stack Web Development' },
  { id: 'frontend', label: 'Frontend Development & UI Improvements' },
  { id: 'backend', label: 'Backend & REST API Development' },
  { id: 'performance', label: 'Performance Optimization' },
] as const satisfies readonly TServiceTag[];
