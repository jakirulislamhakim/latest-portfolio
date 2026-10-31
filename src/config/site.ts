export type TNavItem = {
  label: string;
  href: string;
};

/** Optional primary link (e.g. Blog) — only rendered when `enabled` is true. */
export type TNavItemOptional = TNavItem & {
  enabled: boolean;
};

export type TSocialLink = {
  id: string;
  name: string;
  href: string;
  ariaLabel: string;
};

export const SITE = {
  name: 'JAKIRUL ISLAM',
  fullName: 'Jakirul Islam Hakim',
  shortName: 'JIH',
  role: 'Full Stack Developer',
  headerSlogan: ['TakeRisk', 'HaveFun'],
  statusLine: 'Built with Next.js',
  timezone: 'Asia/Dhaka',
  cvHref: '/cv.pdf',
  phone: '+8801736100945',
  url: 'https://jakirul-islam-hakim.vercel.app/',
} as const;

export const FOOTER_CONTENT = {
  pitch:
    'Got an idea stuck in your head? I help turn rough concepts into real, working web apps — clear ownership, clean code, and a smooth path from first chat to launch. Ready when you are.',
  ctaLabel: "Let's Talk",
  ctaHref: '/#contact',
  navHeading: 'Explore',
  socialHeading: 'Connect',
  socialHook:
    'Not ready for a full project talk? No pressure — say hi on any of these. Even a short hello is welcome.',
} as const;

/**
 * Full explore list (footer + mobile sheet + scroll-spy).
 * Home section links use `/#…` so they work from any route (e.g. project detail).
 */
export const NAV_ITEMS = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Activity', href: '/#activity' },
  { label: 'Terminal', href: '/#terminal' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Services', href: '/#services' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
] as const satisfies readonly TNavItem[];

function pickNavItems(hrefs: readonly string[]): TNavItem[] {
  return hrefs.map((href) => {
    const item = NAV_ITEMS.find((navItem) => navItem.href === href);
    if (!item) {
      throw new Error(`Missing nav item for href: ${href}`);
    }
    return item;
  });
}

/** Desktop primary row — short list so tablet does not overflow. */
export const NAV_PRIMARY_ITEMS = pickNavItems([
  '/#about',
  '/#projects',
  '/#services',
  '/#experience',
]);

/** Desktop “More” menu — secondary sections. */
export const NAV_MORE_ITEMS = pickNavItems(['/#skills', '/#activity', '/#terminal', '/#contact']);

export const NAV_MORE_LABEL = 'More';

export const SOCIAL_LINKS = [
  {
    id: 'github',
    name: 'GitHub',
    href: 'https://github.com/jakirulislamhakim',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jakirulislamhakim/',
    ariaLabel: 'Visit my LinkedIn profile',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    href: 'https://www.facebook.com/jakirulIslamHakim1',
    ariaLabel: 'Visit my Facebook profile',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    href: 'https://wa.me/8801736100945',
    ariaLabel: 'Chat with me on WhatsApp',
  },
  {
    id: 'email',
    name: 'Email',
    href: 'mailto:jakirulislamhakim@gmail.com',
    ariaLabel: 'Send an email to Jakirul Islam Hakim',
  },
] as const satisfies readonly TSocialLink[];
