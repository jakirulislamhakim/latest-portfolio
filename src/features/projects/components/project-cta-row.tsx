'use client';

import type { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Link as LinkIcon } from 'lucide-react';
import { SocialIcon } from '@/components/shared/social-icon';
import { cn } from '@/lib/utils';
import { PROJECTS_CONTENT } from '../constants';

type TProjectCtaRowProps = {
  detailsHref: string;
  liveUrl?: string;
  githubUrl?: string;
  liveLabel?: string;
  githubLabel?: string;
};

const CELL_BASE_CLASS =
  'group/cta relative isolate flex min-h-11 w-full flex-col items-center justify-center gap-1 overflow-hidden px-2 py-1 text-center focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none';

const CELL_CLASS = cn(
  CELL_BASE_CLASS,
  'before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-primary/12 before:transition-transform before:duration-300 before:ease-out before:content-[""]',
  'hover:before:scale-x-100'
);

const DISABLED_CELL_CLASS = cn(CELL_BASE_CLASS, 'cursor-not-allowed opacity-40');

const LABEL_CLASS =
  'relative z-10 text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase transition-colors duration-300 group-hover/cta:text-foreground';

const ICON_WRAP_CLASS =
  'relative z-10 flex size-8 items-center justify-center text-foreground transition-colors duration-300 group-hover/cta:text-primary';

type TCtaCellContentProps = {
  label: string;
  children: ReactNode;
  isDisabled?: boolean;
};

function CtaCellContent({ label, children, isDisabled = false }: TCtaCellContentProps) {
  return (
    <>
      <span className={cn(ICON_WRAP_CLASS, isDisabled && 'group-hover/cta:text-foreground')}>
        {children}
      </span>
      <span className={cn(LABEL_CLASS, isDisabled && 'group-hover/cta:text-muted-foreground')}>
        {label}
      </span>
    </>
  );
}

function hasUrl(url: string | undefined): url is string {
  return typeof url === 'string' && url.trim().length > 0;
}

type TDisabledCtaProps = {
  label: string;
  title: string;
  children: ReactNode;
};

function handleDisabledCtaClick(event: MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
}

function DisabledCta({ label, title, children }: TDisabledCtaProps) {
  return (
    <button
      type="button"
      aria-disabled="true"
      title={title}
      aria-label={`${label} unavailable`}
      onClick={handleDisabledCtaClick}
      className={DISABLED_CELL_CLASS}
    >
      <CtaCellContent label={label} isDisabled>
        {children}
      </CtaCellContent>
    </button>
  );
}

export function ProjectCtaRow({
  detailsHref,
  liveUrl,
  githubUrl,
  liveLabel = PROJECTS_CONTENT.liveLabel,
  githubLabel = PROJECTS_CONTENT.githubLabel,
}: TProjectCtaRowProps) {
  return (
    <nav
      aria-label="Project actions"
      className="mt-auto grid grid-cols-3 divide-x divide-border border-t border-border bg-muted/30"
    >
      {hasUrl(liveUrl) ? (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={CELL_CLASS}>
          <CtaCellContent label={liveLabel}>
            <LinkIcon className="size-4" aria-hidden="true" />
          </CtaCellContent>
        </a>
      ) : (
        <DisabledCta label={liveLabel} title="Live demo URL is not available">
          <LinkIcon className="size-4" aria-hidden="true" />
        </DisabledCta>
      )}

      {hasUrl(githubUrl) ? (
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={CELL_CLASS}>
          <CtaCellContent label={githubLabel}>
            <SocialIcon id="github" className="size-4" />
          </CtaCellContent>
        </a>
      ) : (
        <DisabledCta label={githubLabel} title="GitHub source URL is not available">
          <SocialIcon id="github" className="size-4" />
        </DisabledCta>
      )}

      <Link href={detailsHref} className={CELL_CLASS}>
        <CtaCellContent label={PROJECTS_CONTENT.detailsLabel}>
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5"
            aria-hidden="true"
          />
        </CtaCellContent>
      </Link>
    </nav>
  );
}
