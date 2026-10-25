import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs/config';
import { env } from './src/config/env';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Nodemailer uses Node's network stack. Leave it out of the client bundle.
  serverExternalPackages: ['nodemailer'],
  // The Dev Tunnel forwards the action with its own host while the page origin stays localhost.
  // Next.js rejects that mismatch. Allow it only while developing.
  ...(env.NODE_ENV === 'development'
    ? {
        allowedDevOrigins: ['**.devtunnels.ms'],
        experimental: {
          serverActions: {
            allowedOrigins: ['localhost:3000'],
          },
        },
      }
    : {}),
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
