import { Mail } from 'lucide-react';
import { HERO_CONTENT, HERO_SOCIAL_LINKS } from '../constants';
import Link from 'next/link';

type TSocialIconProps = {
  className?: string;
};

function GitHubIcon({ className }: TSocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: TSocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 1 0 1.65 1.65c0-.91-.74-1.65-1.65-1.65z" />
    </svg>
  );
}

function FacebookIcon({ className }: TSocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const getSocialIcon = (id: string) => {
  const iconClass =
    'size-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary';
  switch (id) {
    case 'github':
      return <GitHubIcon className={iconClass} />;
    case 'linkedin':
      return <LinkedInIcon className={iconClass} />;
    case 'facebook':
      return <FacebookIcon className={iconClass} />;
    case 'email':
      return <Mail className={iconClass} />;
    default:
      return null;
  }
};

export function HeroSocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2 md:gap-4">
      <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {HERO_CONTENT.socialsLabel}
      </span>
      <div className="flex items-center gap-2">
        {HERO_SOCIAL_LINKS.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel}
            className="group flex size-11 items-center justify-center rounded-xl border border-border/70 bg-card/80 shadow-xs backdrop-blur-xs transition-[transform,color,background-color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted hover:shadow-sm"
          >
            {getSocialIcon(link.id)}
          </Link>
        ))}
      </div>
    </div>
  );
}
