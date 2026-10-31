# Deploy & CI

## Branch flow

```text
feature/*  →  development  →  main  →  Vercel Production
                 ↑                ↑
            PRs + CI          owner-only PR from development
```

Details and branch-protection checklist: [`.github/branch-protection.md`](../.github/branch-protection.md).

| Branch                  | Role                                                  |
| ----------------------- | ----------------------------------------------------- |
| `feature/*`, `fix/*`, … | Local work; PR into `development`                     |
| `development`           | Integration; Vercel Preview                           |
| `main`                  | Production; only from `development` by the repo owner |

PRs that target `main` from the wrong branch or from forks are rejected by [`validate-pr-target.yml`](../.github/workflows/validate-pr-target.yml).

## Vercel

1. Import [latest-portfolio](https://github.com/jakirulislamhakim/latest-portfolio).
2. Framework preset: **Next.js**. Build: `pnpm build` (pnpm via `packageManager` in `package.json`).
3. Copy every variable from [`.env.example`](../.env.example) into Vercel **Environment Variables** (Production at minimum; Preview if previews should send mail / hit GitHub).
4. Production URL (current): [jakirul-islam-hakim.vercel.app](https://jakirul-islam-hakim.vercel.app/).

## GitHub Actions

| Workflow                                                                | When                                | What                                                             |
| ----------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| [`ci.yml`](../.github/workflows/ci.yml)                                 | Push / PR to `main` & `development` | Install, lint, typecheck, format, build, Gitleaks, CodeQL, audit |
| [`validate-pr-target.yml`](../.github/workflows/validate-pr-target.yml) | PRs to `main`                       | Source must be `development`; author = owner                     |
| [`lighthouse.yml`](../.github/workflows/lighthouse.yml)                 | As configured                       | Lighthouse CI                                                    |
| [`dependency-audit.yml`](../.github/workflows/dependency-audit.yml)     | As configured                       | Dependency audit                                                 |

### Secrets required for CI `build`

Same names as local env (see [environment.md](./environment.md)):

- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`
- `GH_ACTIVITY_TOKEN`
- `GMAIL_USER`, `GMAIL_APP_PASSWORD` (dummy values OK for CI if mail is not tested)

## Local quality gate (before PR)

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
```

Full contributor flow: [CONTRIBUTING.md](../CONTRIBUTING.md).
