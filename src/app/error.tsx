'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { SectionLayout } from '@/components/layout/section-layout';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log route-level error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <SectionLayout id="error" needTopPadding className="flex flex-1 flex-col justify-center">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3.5 py-1 text-xs font-semibold text-destructive">
          <AlertTriangle className="size-3.5" />
          <span>Error Occurred</span>
        </div>

        {/* Heading */}
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Something went wrong
        </h1>

        {/* Message */}
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          An unexpected error occurred while loading this section. The issue has been recorded in
          our monitoring system.
        </p>

        {error.digest && (
          <p className="mt-2 rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className={cn(
              buttonVariants(),
              'group cursor-pointer rounded-xl bg-linear-to-r from-primary to-chart-2 px-5 font-semibold text-primary-foreground shadow-md shadow-primary/20'
            )}
          >
            <RotateCcw className="size-4 transition-transform group-hover:-rotate-45" />
            <span>Try again</span>
          </button>

          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'rounded-xl border-border/80 bg-card/80 px-5 font-semibold text-foreground hover:bg-muted'
            )}
          >
            <Home className="size-4 text-primary" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </SectionLayout>
  );
}
