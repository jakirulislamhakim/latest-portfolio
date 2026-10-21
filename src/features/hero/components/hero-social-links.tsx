import Link from 'next/link';
import { SocialIcon } from '@/components/shared/social-icon';
import { SOCIAL_LINKS } from '@/config/site';
import { HERO_CONTENT } from '../constants';

export function HeroSocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2 md:gap-4">
      <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {HERO_CONTENT.socialsLabel}
      </span>
      <div className="flex items-center gap-2">
        {SOCIAL_LINKS.map((link) => {
          const isExternal = link.href.startsWith('http');

          return (
            <Link
              key={link.id}
              href={link.href}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={link.ariaLabel}
              className="group flex size-11 items-center justify-center rounded-xl border border-border/70 bg-card/80 shadow-xs backdrop-blur-xs transition-[transform,color,background-color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted hover:shadow-sm"
            >
              <SocialIcon
                id={link.id}
                className="size-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
