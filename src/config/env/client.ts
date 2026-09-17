import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Client-safe environment variables (NEXT_PUBLIC_* only).
 * Safe to import from both server and client components.
 */
export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },

  // Must explicitly destructure NEXT_PUBLIC_* vars for Next.js static replacement
  runtimeEnv: {
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },

  emptyStringAsUndefined: true,
});
