import type { TProject, TProjectOwnership, TProjectStatus, TProjectTag } from '../types';

export const PROJECTS_CONTENT = {
  heading: 'Featured Projects',
  intro:
    'Selected apps with a clear problem, what changed, and links to try the work — written so both clients and recruiters can skim fast.',
  liveLabel: 'Live',
  githubLabel: 'GitHub',
  detailsLabel: 'Details',
  liveDemoLabel: 'Live demo',
  sourceCodeLabel: 'Source code',
  backLabel: 'Back to projects',
  featuredLabel: 'Featured',
  relatedHeading: 'Related projects',
  projectInfoHeading: 'Project information',
  stackHeading: 'Technology stack',
  problemLabel: 'Problem',
  outcomeLabel: 'Outcome',
  overviewTab: 'Overview',
  challengesTab: 'Challenges',
  solutionsTab: 'Solutions',
  resultsTab: 'Results',
  typeLabel: 'Type',
  clientLabel: 'Client',
  durationLabel: 'Duration',
  roleLabel: 'Role',
  ownershipLabel: 'Built as',
  filterLabel: 'Filter projects by type',
  filterAllLabel: 'All',
  emptyFilter: 'No projects match this filter yet.',
  clientCtaIntro:
    'Need custom solutions or products for your business? Share what you need — I can help build it.',
  clientCtaLabel: 'Talk about your project',
  clientCtaHref: '#contact',
  clientCtaAriaLabel: 'Contact me to talk about a custom project for your business',
} as const;

export const PROJECT_STATUS_LABELS = {
  shipped: 'Shipped',
  'in-progress': 'In progress',
  demo: 'Demo',
} as const satisfies Record<TProjectStatus, string>;

export const PROJECT_TAG_LABELS = {
  'full-stack': 'Full stack',
  frontend: 'Frontend',
  backend: 'Backend',
} as const satisfies Record<TProjectTag, string>;

export const PROJECT_OWNERSHIP_LABELS = {
  solo: 'Solo',
  team: 'Team',
} as const satisfies Record<TProjectOwnership, string>;

export const PROJECT_FILTERS = [
  { id: 'all', label: PROJECTS_CONTENT.filterAllLabel },
  { id: 'full-stack', label: PROJECT_TAG_LABELS['full-stack'] },
  { id: 'frontend', label: PROJECT_TAG_LABELS.frontend },
  { id: 'backend', label: PROJECT_TAG_LABELS.backend },
] as const;

export type TProjectFilterId = (typeof PROJECT_FILTERS)[number]['id'];

export const PROJECTS = [
  {
    id: 'sports-booking',
    slug: 'sports-facility-booking',
    title: 'Sports Facility Booking',
    pitch: 'Scheduling for facility staff who used to book courts by phone.',
    problem: 'Phone bookings caused overlapping slots and confused schedules.',
    outcome: 'Admins manage one calendar; overlapping bookings are blocked at save time.',
    overview:
      'A full-stack booking app for sports facilities. Staff can create slots, take bookings, and see availability in one place instead of juggling phone notes. Built as a solo project to practice end-to-end product flow: UI, API, and data rules that prevent double-booking.',
    challenges:
      'Booking rules had to block overlaps without a heavy calendar product. The admin UI needed to stay clear on phone and desktop. Time was limited, so the stack had to stay familiar and deployable without extra services.',
    solutions:
      'I modeled bookings with start/end times and validated conflicts on the server before save. The UI shows availability in a simple schedule view rather than a complex drag calendar. REST APIs keep create/update flows explicit for interview walkthroughs and future clients.',
    results:
      'Facility staff get a single admin calendar. Overlapping bookings are rejected at save. The project demonstrates auth-ready full-stack structure, validation, and a responsive booking UI ready for a real facility to adopt.',
    role: 'Full-stack design, API, and booking UI',
    ownership: 'solo',
    tag: 'full-stack',
    projectType: 'Full-Stack Web App',
    clientLabel: 'Personal project',
    durationLabel: 'Ongoing / portfolio',
    status: 'demo',
    featured: true,
    image: {
      src: '/images/projects/sports-booking.svg',
      alt: 'Placeholder preview for the sports facility booking application',
      width: 1200,
      height: 750,
    },
    stack: [
      { id: 'nextjs', label: 'Next.js' },
      { id: 'react', label: 'React' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'nodejs', label: 'Node.js' },
      { id: 'mongodb', label: 'MongoDB' },
    ],
    // Add liveUrl / githubUrl when demos and repos are ready.
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'online-nursery',
    slug: 'online-nursery',
    title: 'Online Nursery',
    pitch: 'Plant shop with catalog, cart, and checkout for buyers and admins.',
    problem: 'Sales lived in social DMs with no clear catalog or inventory view.',
    outcome: 'Buyers can browse and order in one flow; admins manage products in one place.',
    overview:
      'An online nursery storefront for browsing plants, adding them to a cart, and placing orders. Aimed at small sellers who currently take orders over chat and need a clearer product list and order record.',
    challenges:
      'Product and order state had to stay consistent between shopper and admin views. The UI needed to feel trustworthy for purchases without overbuilding payments on day one. Catalog content and empty states had to stay readable on mobile.',
    solutions:
      'I separated catalog, cart, and order concerns behind REST endpoints and a clear admin product flow. The storefront focuses on browse → cart → order. Stack choices stayed in the MERN family so the app is easy to extend with real payments later.',
    results:
      'A complete commerce slice buyers and admins can use end to end. It shows product modeling, cart flow, and admin management — useful proof for client store builds and for recruiters scanning full-stack range.',
    role: 'Full-stack storefront and admin flows',
    ownership: 'solo',
    tag: 'full-stack',
    projectType: 'E-commerce Web App',
    clientLabel: 'Personal project',
    durationLabel: 'Portfolio build',
    status: 'demo',
    image: {
      src: '/images/projects/online-nursery.svg',
      alt: 'Placeholder preview for the online nursery storefront',
      width: 1200,
      height: 750,
    },
    stack: [
      { id: 'react', label: 'React' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'nodejs', label: 'Node.js' },
      { id: 'express', label: 'Express.js' },
      { id: 'mongodb', label: 'MongoDB' },
    ],
    // Add liveUrl / githubUrl when demos and repos are ready.
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'library-management',
    slug: 'library-management',
    title: 'Library Management',
    pitch: 'Loan tracking for a small library workflow in one admin UI.',
    problem: 'Books, members, and loans were tracked by hand and easy to lose.',
    outcome: 'Librarians manage members, books, and loans from a single dashboard.',
    overview:
      'A library management system for tracking books, members, and loans. Built to replace paper or spreadsheet workflows with a structured admin interface and reliable loan status.',
    challenges:
      'Loan lifecycle (available, borrowed, returned, overdue) needed clear rules. Data relationships between members and books had to stay consistent. The admin UI had to be fast to scan during busy desk work.',
    solutions:
      'I modeled books, members, and loans as related entities with validation on borrow/return actions. The dashboard surfaces status clearly. PostgreSQL fits relational loan data; the frontend keeps forms and lists simple for day-to-day use.',
    results:
      'One place to manage the library desk workflow. Demonstrates relational data design, admin UX, and full-stack delivery beyond a simple CRUD demo.',
    role: 'Full-stack admin dashboard and data model',
    ownership: 'solo',
    tag: 'full-stack',
    projectType: 'Admin Web App',
    clientLabel: 'Personal project',
    durationLabel: 'Portfolio build',
    status: 'demo',
    image: {
      src: '/images/projects/library-management.svg',
      alt: 'Placeholder preview for the library management dashboard',
      width: 1200,
      height: 750,
    },
    stack: [
      { id: 'nextjs', label: 'Next.js' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'nodejs', label: 'Node.js' },
      { id: 'postgresql', label: 'PostgreSQL' },
    ],
    // Add liveUrl / githubUrl when demos and repos are ready.
    liveUrl: 'https://github.com/jakirulislamhakim',
    githubUrl: 'https://github.com/jakirulislamhakim',
  },
] as const satisfies readonly TProject[];
