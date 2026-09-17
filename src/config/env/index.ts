import { clientEnv } from './client';
import { serverEnv } from './server';

/**
 * Validated environment variables.
 *
 * @example
 * import { env } from '@/config/env';
 * env.SENTRY_DSN             // server-only
 * env.NEXT_PUBLIC_SENTRY_DSN // client-safe
 */
export const env = {
  ...serverEnv,
  ...clientEnv,
};
