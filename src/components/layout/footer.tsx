import Link from 'next/link';
import { ArrowUp, ArrowUpRight, ChevronRight } from 'lucide-react';
import { BrandMark } from '@/components/layout/brand-mark';
import { FooterLocalTime } from '@/components/layout/footer-local-time';
import { SocialIcon } from '@/components/shared/social-icon';
import { buttonVariants } from '@/components/ui/button';
import { FOOTER_CONTENT, NAV_ITEMS, SITE, SOCIAL_LINKS } from '@/config/site';
import type { TNavItem } from '@/config/site';
import { cn } from '@/lib/utils';

const NAV_COLUMN_ONE = NAV_ITEMS.slice(0, 4);
const NAV_COLUMN_TWO = NAV_ITEMS.slice(4, 8);
const GITHUB_PROFILE = SOCIAL_LINKS.find((link) => link.id === 'github');

type TFooterNavLinkProps = {
  item: TNavItem;
};

function FooterNavLink({ item }: TFooterNavLinkProps) {
  return (
    <Link
      href={item.href}
      className="group inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <ChevronRight
        className="size-3.5 shrink-0 text-primary transition-colors group-hover:text-primary"
        aria-hidden="true"
      />
      <span>{item.label}</span>
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-muted/30">
      {/* Footer top section */}
      <div className="mx-auto max-w-6xl px-4 py-12 pb-4 md:px-6 md:py-14 md:pb-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_auto_minmax(0,0.9fr)] lg:items-start lg:gap-12 xl:gap-16">
          {/* Brand + pitch + CTA */}
          <div className="flex max-w-md flex-col gap-4">
            <Link
              href="/"
              className="group flex items-center gap-1 text-foreground transition-opacity hover:opacity-90"
            >
              <BrandMark />
              <div className="flex flex-col">
                <span className="font-heading text-sm font-semibold tracking-tight text-foreground md:text-base">
                  {SITE.name}
                </span>
                <span className="text-xs text-muted-foreground">{SITE.role}</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {FOOTER_CONTENT.pitch}
            </p>

            <Link
              href={FOOTER_CONTENT.ctaHref}
              className={cn(buttonVariants({ size: 'default' }), 'w-fit gap-1.5')}
            >
              <span>{FOOTER_CONTENT.ctaLabel}</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          {/* Explore + 2 link columns */}
          <div className="flex flex-col gap-5">
            <p className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {FOOTER_CONTENT.navHeading}
            </p>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-1 sm:gap-x-10">
              <ul className="flex flex-col gap-0.5">
                {NAV_COLUMN_ONE.map((item) => (
                  <li key={item.href}>
                    <FooterNavLink item={item} />
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-0.5">
                {NAV_COLUMN_TWO.map((item) => (
                  <li key={item.href}>
                    <FooterNavLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Connect + hook + socials */}
          <div className="flex flex-col gap-5">
            <p className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {FOOTER_CONTENT.socialHeading}
            </p>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {FOOTER_CONTENT.socialHook}
            </p>

            <ul className="flex flex-wrap items-center gap-2" aria-label="Social links">
              {SOCIAL_LINKS.map((link) => {
                const isExternal = link.href.startsWith('http');

                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      aria-label={link.ariaLabel}
                      className="group flex size-11 items-center justify-center rounded-xl border border-border/70 bg-card shadow-xs transition-[transform,color,background-color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <SocialIcon
                        id={link.id}
                        className="size-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="mt-12 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:grid-cols-3">
          <FooterLocalTime className="md:justify-self-start" />

          <Link
            href="#hero"
            aria-label="Back to top"
            className="col-start-2 row-start-1 flex size-11 shrink-0 items-center justify-center justify-self-end rounded-lg border border-border/70 bg-card text-muted-foreground shadow-xs transition-colors hover:border-primary/50 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:col-start-3"
          >
            <ArrowUp className="size-6 text-primary" aria-hidden="true" />
          </Link>

          <p className="col-span-2 row-start-2 min-w-0 md:col-span-1 md:col-start-2 md:row-start-1 md:justify-self-center md:text-center">
            © {year}{' '}
            {GITHUB_PROFILE ? (
              <Link
                href={GITHUB_PROFILE.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {SITE.fullName}
              </Link>
            ) : (
              SITE.fullName
            )}{' '}
            • {SITE.statusLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
