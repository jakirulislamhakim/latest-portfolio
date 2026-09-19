import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs/config';
import { env } from './src/config/env';

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default withSentryConfig(nextConfig, {
  org: env.SENTRY_ORG,
  project: env.SENTRY_PROJECT,
  authToken: env.SENTRY_AUTH_TOKEN,
  silent: !env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',

  // Sentry options specific to Webpack (silences Turbopack deprecation warnings)
  webpack: {
    reactComponentAnnotation: {
      enabled: true,
    },
    automaticVercelMonitors: true,
  },
});
