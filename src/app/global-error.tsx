'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

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
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-zinc-100 antialiased">
        <main className="flex max-w-md flex-col items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
            <svg
              className="size-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            Critical application error
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            An unexpected error occurred. Our engineering team has been automatically notified via
            Sentry.
          </p>
          {error.digest && (
            <p className="mt-2 font-mono text-xs text-zinc-500">Error Digest: {error.digest}</p>
          )}
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
