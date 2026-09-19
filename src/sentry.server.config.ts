import { EventEmitter } from 'node:events';
import * as Sentry from '@sentry/nextjs';
import { env } from '@/config/env';

// Next.js App Router streaming + Sentry HTTP instrumentation together attach 11 listeners
// to ServerResponse. Raise the default warning threshold (10) to 25 to silence false positives.
EventEmitter.defaultMaxListeners = 25;

Sentry.init({
  dsn: env.SENTRY_DSN || env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment tag — keeps staging crashes out of production crash-free rates
  // release is intentionally omitted: withSentryConfig injects it from git HEAD
  environment: env.NODE_ENV,

  // Tracing: 100% in development for local verification, 10% in production
  tracesSampleRate: env.NODE_ENV === 'development' ? 1.0 : 0.1,

  // Attach local variable values to stack frames (server runtime only)
  includeLocalVariables: true,

  // Enable Sentry Logs integration + auto-capture warn/error console calls
  enableLogs: true,
  integrations: [Sentry.consoleLoggingIntegration({ levels: ['warn', 'error'] })],

  // Enable debug mode only when explicitly troubleshooting
  debug: false,
});
