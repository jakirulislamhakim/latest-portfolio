import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PROJECTS_CONTENT } from '../constants';

export function ProjectsClientCta() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 text-center md:mt-12">
      <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
        {PROJECTS_CONTENT.clientCtaIntro}
      </p>
      <a
        href={PROJECTS_CONTENT.clientCtaHref}
        aria-label={PROJECTS_CONTENT.clientCtaAriaLabel}
        className={cn(buttonVariants(), 'group min-h-11 gap-2')}
      >
        <span>{PROJECTS_CONTENT.clientCtaLabel}</span>
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
