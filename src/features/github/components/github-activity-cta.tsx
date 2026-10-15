import { ExternalLink } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GITHUB_ACTIVITY_CONTENT, GITHUB_PROFILE_URL } from '../constants';

export function GithubActivityCta() {
  return (
    <div className="mt-6 flex justify-center md:mt-8">
      <a
        href={GITHUB_PROFILE_URL}
        target="_blank"
        rel="noreferrer"
        aria-label={GITHUB_ACTIVITY_CONTENT.ctaAriaLabel}
        className={cn(buttonVariants({ variant: 'outline' }), 'min-h-11 gap-2')}
      >
        <span>{GITHUB_ACTIVITY_CONTENT.ctaLabel}</span>
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
