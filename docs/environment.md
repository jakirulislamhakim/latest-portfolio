# Environment variables

All app env access goes through **`@/config/env`** (t3-env + Zod). Invalid or missing required values fail at build/start instead of failing silently at runtime.

```ts
import { env } from '@/config/env';

env.NEXT_PUBLIC_SENTRY_DSN; // client-safe
env.GMAIL_USER; // server-only
```

| Module | File                       | Notes                     |
| ------ | -------------------------- | ------------------------- |
| Client | `src/config/env/client.ts` | `NEXT_PUBLIC_*` only      |
| Server | `src/config/env/server.ts` | Secrets and server config |
| Barrel | `src/config/env/index.ts`  | Merges both as `env`      |

## Local setup

```bash
cp .env.example .env.local
```

Edit `.env.local`. Never commit real secrets. `.env.example` is the template; CI and Vercel use the same **names**.

## Variable reference

| Name                     | Where  | Required | Purpose                                      |
| ------------------------ | ------ | -------- | -------------------------------------------- |
| `NEXT_PUBLIC_SENTRY_DSN` | Client | Yes      | Browser Sentry DSN (must be a URL)           |
| `SENTRY_DSN`             | Server | No       | Server/edge DSN (optional)                   |
| `SENTRY_ORG`             | Server | Yes      | Sentry org slug (sourcemaps)                 |
| `SENTRY_PROJECT`         | Server | Yes      | Sentry project slug                          |
| `SENTRY_AUTH_TOKEN`      | Server | Yes      | Upload sourcemaps / releases                 |
| `GH_ACTIVITY_TOKEN`      | Server | Yes      | GitHub GraphQL for the activity calendar     |
| `GMAIL_USER`             | Server | Yes      | Contact form From address                    |
| `GMAIL_APP_PASSWORD`     | Server | Yes      | Gmail app password (not the normal password) |

`NODE_ENV`, `CI`, and `NEXT_RUNTIME` are handled in the server schema for tooling; you usually do not set them by hand locally.

## Deep setup guides

- [Sentry](./setup/sentry.md)
- [Contact email (Gmail)](./setup/contact-email.md)
- [GitHub activity token](./setup/github-activity.md)
