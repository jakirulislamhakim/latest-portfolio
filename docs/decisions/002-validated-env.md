# 002 — Validated environment variables

## Context

Next.js apps often read `process.env` ad hoc. Missing secrets then break only in production or only on one route.

## Decision

Use `@t3-oss/env-nextjs` + Zod in `src/config/env`. App code imports `{ env } from '@/config/env'`. Split client (`NEXT_PUBLIC_*`) and server schemas.

## Why

- Fail fast at build/start if a required value is missing or the wrong shape.
- Keeps secrets out of the client bundle by construction.
- One documented list (aligned with `.env.example`).

## Trade-off

Local and CI must always provide the full required set (including Sentry and Gmail), even when you are only tweaking UI. Dummy values are acceptable in CI for mail.
