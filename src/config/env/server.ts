import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Server-only environment variables.
 * Never imported from client components — enforced at runtime by t3-env.
 */
export const serverEnv = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
    CI: z.string().optional(),
    SENTRY_ORG: z.string().min(1),
    SENTRY_PROJECT: z.string().min(1),
    SENTRY_AUTH_TOKEN: z.string().min(1),
    SENTRY_DSN: z.string().url().optional(),
  },

  // Next.js >= 13.4.4: pass full process.env for server-side vars
  experimental__runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});
