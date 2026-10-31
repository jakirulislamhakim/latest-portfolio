'use client';

import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { Menu } from '@base-ui/react/menu';
import { ArrowUpRight, ChevronDown, Menu as MenuIcon, X } from 'lucide-react';
import { BrandMark } from '@/components/layout/brand-mark';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import {
  FOOTER_CONTENT,
  NAV_ITEMS,
  NAV_MORE_ITEMS,
  NAV_MORE_LABEL,
  NAV_PRIMARY_ITEMS,
  SITE,
  type TNavItem,
} from '@/config/site';
import { cn } from '@/lib/utils';

/** Pull `#section` from `#section` or `/#section`. */
function getHashFromHref(href: string): string | null {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) {
    return null;
  }

  return href.slice(hashIndex);
}

function getHashTarget(hash: string): HTMLElement | null {
  const target = document.querySelector(hash);
  return target instanceof HTMLElement ? target : null;
}

/**
 * Scroll when the section exists on this page (fixes same-hash re-clicks).
 * Returns true when default navigation was handled locally.
 */
function scrollToHashTarget(hash: string): boolean {
  const target = getHashTarget(hash);
  if (!target) {
    return false;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });

  if (window.location.hash !== hash) {
    window.history.pushState(null, '', hash);
  }

  return true;
}

function handleHashLinkClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate: (hash: string) => void
) {
  const hash = getHashFromHref(href);
  if (!hash) {
    return;
  }

  onNavigate(hash);

  if (scrollToHashTarget(hash)) {
    event.preventDefault();
  }
}

function isNavItemActive(item: TNavItem, activeSection: string): boolean {
  return activeSection === getHashFromHref(item.href);
}

type TDesktopNavLinkProps = {
  item: TNavItem;
  isActive: boolean;
  onNavigate: (hash: string) => void;
};

function DesktopNavLink({ item, isActive, onNavigate }: TDesktopNavLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    handleHashLinkClick(event, item.href, onNavigate);
  };

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        'group relative px-3.5 py-2 text-sm font-medium transition-colors duration-200',
        isActive ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <span>{item.label}</span>
      <span
        className={cn(
          'absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out',
          isActive
            ? 'scale-x-100 opacity-100'
            : 'scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-40'
        )}
        aria-hidden="true"
      />
    </Link>
  );
}

type TDesktopMoreMenuProps = {
  items: readonly TNavItem[];
  activeSection: string;
  onNavigate: (hash: string) => void;
};

function DesktopMoreMenu({ items, activeSection, onNavigate }: TDesktopMoreMenuProps) {
  const isMoreActive = items.some((item) => isNavItemActive(item, activeSection));

  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          'group relative inline-flex min-h-11 items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring data-[popup-open]:[&_svg]:rotate-180',
          isMoreActive
            ? 'font-semibold text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <span>{NAV_MORE_LABEL}</span>
        <ChevronDown className="size-3.5 transition-transform duration-200" aria-hidden="true" />
        <span
          className={cn(
            'absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out',
            isMoreActive
              ? 'scale-x-100 opacity-100'
              : 'scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-40'
          )}
          aria-hidden="true"
        />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner className="z-50 outline-none" sideOffset={8} align="start">
          <Menu.Popup className="min-w-44 origin-[var(--transform-origin)] rounded-xl border border-border bg-popover p-1 shadow-md outline-none">
            {items.map((item) => {
              const isActive = isNavItemActive(item, activeSection);

              const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
                handleHashLinkClick(event, item.href, onNavigate);
              };

              return (
                <Menu.LinkItem
                  key={item.href}
                  href={item.href}
                  closeOnClick
                  onClick={handleClick}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'flex min-h-11 cursor-default items-center rounded-lg px-3 text-sm outline-none select-none',
                    'data-highlighted:bg-muted data-highlighted:text-foreground',
                    '[@media(hover:hover)_and_(pointer:fine)]:cursor-pointer',
                    isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Menu.LinkItem>
              );
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

type TMobileNavLinkProps = {
  item: TNavItem;
  isActive: boolean;
  onNavigate: (hash: string) => void;
};

function MobileNavLink({ item, isActive, onNavigate }: TMobileNavLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    handleHashLinkClick(event, item.href, onNavigate);
  };

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        'group relative flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors',
        isActive
          ? 'bg-muted font-semibold text-foreground'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
      )}
    >
      <div className="relative flex flex-col">
        <span>{item.label}</span>
        {isActive ? (
          <span className="mt-1 h-0.5 w-6 rounded-full bg-primary" aria-hidden="true" />
        ) : null}
      </div>
      <ArrowUpRight
        className={cn(
          'size-4 transition-transform',
          isActive ? 'translate-x-0.5 -translate-y-0.5 text-primary' : 'text-muted-foreground'
        )}
      />
    </Link>
  );
}

type THashCtaLinkProps = {
  href: string;
  className: string;
  onNavigate: (hash: string) => void;
  children: ReactNode;
};

function HashCtaLink({ href, className, onNavigate, children }: THashCtaLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    handleHashLinkClick(event, href, onNavigate);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    /** Tracks which observed sections currently hit the spy band. */
    const visibility = new Map<string, boolean>();

    const updateActiveSection = () => {
      // Hero at top → no nav item should look selected.
      if (visibility.get('hero')) {
        setActiveSection('');
        return;
      }

      for (const { href } of NAV_ITEMS) {
        const hash = getHashFromHref(href);
        if (!hash) {
          continue;
        }

        const id = hash.slice(1);
        if (visibility.get(id)) {
          setActiveSection(hash);
          return;
        }
      }

      setActiveSection('');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting);
        }
        updateActiveSection();
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const hero = document.querySelector('#hero');
    if (hero) {
      observer.observe(hero);
    }

    for (const { href } of NAV_ITEMS) {
      const hash = getHashFromHref(href);
      if (!hash) {
        continue;
      }

      const el = document.querySelector(hash);
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (hash: string) => {
    setActiveSection(hash);
    setIsMobileMenuOpen(false);
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-1 text-foreground transition-opacity hover:opacity-90"
        >
          <BrandMark priority />
          <div className="flex flex-col">
            <span className="font-heading text-sm font-semibold tracking-tight text-foreground sm:text-base">
              {SITE.name}
            </span>
            <span className="text-xs text-muted-foreground">{SITE.role}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex lg:gap-2" aria-label="Main Navigation">
          {NAV_PRIMARY_ITEMS.map((item) => (
            <DesktopNavLink
              key={item.href}
              item={item}
              isActive={isNavItemActive(item, activeSection)}
              onNavigate={handleNavigate}
            />
          ))}

          <DesktopMoreMenu
            items={NAV_MORE_ITEMS}
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <HashCtaLink
            href={FOOTER_CONTENT.ctaHref}
            onNavigate={handleNavigate}
            className={cn(buttonVariants({ size: 'sm' }), 'hidden gap-1.5 sm:inline-flex')}
          >
            <span>{FOOTER_CONTENT.ctaLabel}</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </HashCtaLink>

          <button
            type="button"
            onClick={handleToggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="flex size-9 items-center justify-center rounded-lg border border-border/50 text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-md flex-col gap-4 p-6">
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item) => (
                <MobileNavLink
                  key={item.href}
                  item={item}
                  isActive={isNavItemActive(item, activeSection)}
                  onNavigate={handleNavigate}
                />
              ))}
            </nav>

            <div className="pt-2">
              <HashCtaLink
                href={FOOTER_CONTENT.ctaHref}
                onNavigate={handleNavigate}
                className={cn(buttonVariants({ size: 'lg' }), 'w-full justify-center gap-2')}
              >
                <span>{FOOTER_CONTENT.ctaLabel}</span>
                <ArrowUpRight className="size-4" />
              </HashCtaLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
