import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs/config';
import { env } from './src/config/env';

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=2592000',
          },
        ],
      },
    ];
  },
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
