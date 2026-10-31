# Setup: Sentry

Sentry captures client and server errors. Next.js is wrapped with `@sentry/nextjs` in `next.config.ts`.

## 1. Create a Sentry project

1. Sign in at [sentry.io](https://sentry.io/).
2. Create a project for **Next.js**.
3. Copy the **DSN** from **Settings → Client Keys (DSN)**.

## 2. Fill `.env.local`

```bash
NEXT_PUBLIC_SENTRY_DSN="https://...@....ingest.sentry.io/..."
SENTRY_DSN="https://...@....ingest.sentry.io/..."   # optional; can match public DSN
SENTRY_ORG="your-org-slug"
SENTRY_PROJECT="your-project-slug"
SENTRY_AUTH_TOKEN="sntrys_..."
```

| Value               | Where to find it                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Org / project slugs | Sentry org and project settings URLs / settings pages                                                               |
| Auth token          | **User Settings → Auth Tokens** — needs permission to create releases / upload sourcemaps (e.g. `project:releases`) |

## 3. Production (Vercel + CI)

Add the same keys in:

- **Vercel** → Project → Settings → Environment Variables
- **GitHub** → repo → Settings → Secrets and variables → Actions

The CI `build` job reads these secrets (see [Deploy & CI](../deploy-and-ci.md)).

## Notes

- Empty strings are treated as undefined (`emptyStringAsUndefined`).
- `NEXT_PUBLIC_SENTRY_DSN` must be a valid URL or the env schema fails.
