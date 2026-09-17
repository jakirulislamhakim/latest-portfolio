'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

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
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
        We encountered an error loading this section. The issue has been recorded.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-zinc-400 dark:text-zinc-500">
          Digest: {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={() => reset()}
        className="mt-5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Try again
      </button>
    </section>
  );
}
