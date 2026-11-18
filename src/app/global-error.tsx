'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { fontVariables } from '@/lib/fonts';
import '@/app/globals.css';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Forward unhandled root-level error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col items-center justify-center bg-background px-4 text-foreground">
        <main className="flex max-w-md flex-col items-center text-center">
          {/* Error Icon */}
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10 text-destructive">
            <AlertCircle className="size-7" />
          </div>

          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Critical application error
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            An unexpected error occurred while rendering the application shell. Our engineering team
            has been automatically notified via Sentry.
          </p>

          {error.digest && (
            <p className="mt-2 rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">
              Error Digest: {error.digest}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-primary to-chart-2 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:opacity-90"
            >
              <RotateCcw className="size-4" />
              <span>Try again</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center rounded-xl border border-border/80 bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
