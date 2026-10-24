import { SITE, SOCIAL_LINKS } from '@/config/site';
import type { TSocialLink } from '@/config/site';
import type { TContactAction, TContactStatusItem, TContactStep } from '../types';

function requireSocialLink(id: string): TSocialLink {
  const link = SOCIAL_LINKS.find((item) => item.id === id);

  if (!link) {
    throw new Error(`Missing social link: ${id}`);
  }

  return link;
}

function readEmailAddress(href: string): string {
  const prefix = 'mailto:';

  if (!href.startsWith(prefix)) {
    throw new Error('Email link must use a mailto address');
  }

  return href.slice(prefix.length);
}

const EMAIL_LINK = requireSocialLink('email');
const LINKEDIN_LINK = requireSocialLink('linkedin');
const WHATSAPP_LINK = requireSocialLink('whatsapp');

export const CONTACT_EMAIL_ADDRESS = readEmailAddress(EMAIL_LINK.href);

export const CONTACT_CONTENT = {
  heading: 'Get in touch',
  intro: 'Recruiters and clients are both welcome. Use a direct link, or send a short note.',
  statusLabel: 'Current availability',
  stepsLabel: 'What happens next',
} as const;

export const CONTACT_STATUS = [
  { id: 'available', label: 'Available for work' },
  { id: 'reply', label: 'Replies within 24 hours' },
  { id: 'location', label: `Bangladesh, ${SITE.timezone}` },
] as const satisfies readonly TContactStatusItem[];

export const CONTACT_PANEL = {
  title: "Let's work together",
  description:
    'Open to full-time and contract roles, and to new builds or improvements. Remote-friendly.',
  href: EMAIL_LINK.href,
} as const;

export const CONTACT_ACTIONS = [
  {
    id: 'email',
    label: CONTACT_EMAIL_ADDRESS,
    href: EMAIL_LINK.href,
    kind: 'email',
    tone: 'primary',
    icon: 'email',
  },
  {
    id: 'phone',
    label: SITE.phone,
    href: `tel:${SITE.phone}`,
    kind: 'phone',
    tone: 'secondary',
    icon: 'phone',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: WHATSAPP_LINK.href,
    kind: 'external',
    tone: 'secondary',
    icon: 'whatsapp',
  },
  {
    id: 'cv',
    label: 'Download CV',
    href: SITE.cvHref,
    kind: 'download',
    tone: 'secondary',
    icon: 'download',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: LINKEDIN_LINK.href,
    kind: 'external',
    tone: 'secondary',
    icon: 'linkedin',
  },
  {
    id: 'services',
    label: 'See services',
    href: '#services',
    kind: 'internal',
    tone: 'secondary',
    icon: 'services',
  },
] as const satisfies readonly TContactAction[];

export const CONTACT_FORM = {
  heading: 'Send a note',
  description:
    'For a role or a project. Sending opens your email app so you can review the note before it goes out.',
  nameLabel: 'Name',
  namePlaceholder: 'Your name',
  emailLabel: 'Email',
  emailPlaceholder: 'you@gmail.com',
  messageLabel: 'Message',
  messagePlaceholder: 'Role or project — what should we talk about?',
  submitLabel: 'Send message',
  successNote: 'Your message has been sent. I will reply within 24 hours.',
  nameError: 'Name must be at least 2 characters.',
  emailError: 'Enter a valid email address.',
  messageError: 'Message must be at least 15 characters.',
} as const;

export const CONTACT_STEPS = [
  { id: 'send', number: '1', label: 'You send a note' },
  { id: 'reply', number: '2', label: 'I reply within 24 hours' },
  { id: 'talk', number: '3', label: 'We talk about the role or the project' },
] as const satisfies readonly TContactStep[];
