# Jakirul Islam Hakim — Portfolio

Personal portfolio for [Jakirul Islam Hakim](https://github.com/jakirulislamhakim), a full-stack developer. Built to show selected work, skills, and a clear path to get in touch — for both clients and recruiters.

**Live site:** [jakirul-islam-hakim.vercel.app](https://jakirul-islam-hakim.vercel.app/)

---

## Features

- Responsive home page with About, Skills, GitHub activity, interactive Terminal, Projects, Services, Experience, and Contact
- Project detail pages (`/projects/[slug]`) with case-study tabs, stack, and related work
- Contact form (Gmail SMTP) with validation
- Light / dark theme (`next-themes`)
- Error monitoring with Sentry
- Strict TypeScript, ESLint, Prettier, Husky, and Conventional Commits

---

## Tech stack

| Area             | Choice                                                       |
| ---------------- | ------------------------------------------------------------ |
| Framework        | [Next.js](https://nextjs.org/) 16 (App Router)               |
| UI               | React 19, Tailwind CSS v4, Base UI / shadcn-style primitives |
| Language         | TypeScript (strict)                                          |
| Validation / env | Zod, [`@t3-oss/env-nextjs`](https://env.t3.gg/)              |
| Email            | Nodemailer (Gmail app password)                              |
| Observability    | Sentry                                                       |
| Package manager  | [pnpm](https://pnpm.io/)                                     |

---

## Getting started

### Prerequisites

- **Node.js** `>= 20`
- **pnpm** `>= 9` (this repo pins `pnpm@9.15.4` via `packageManager`)

### Install

```bash
git clone https://github.com/jakirulislamhakim/latest-portfolio.git
cd latest-portfolio
pnpm install
```

### Environment variables

Copy the example file and fill in values locally:

```bash
cp .env.example .env.local
```

| Variable                                              | Purpose                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SENTRY_DSN`                              | Browser error reporting                                                      |
| `SENTRY_DSN`                                          | Server / edge reporting (optional; can fall back to the public DSN)          |
| `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` | Sourcemaps and releases                                                      |
| `GH_ACTIVITY_TOKEN`                                   | GitHub GraphQL token for the contribution calendar                           |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD`                   | Contact form sender (use a Gmail **app password**, not your normal password) |

Never commit `.env.local` or real secrets. For Vercel / CI, set the same names as project environment variables or repository secrets.

> Env access in app code goes through `@/config/env` — not raw `process.env` — so missing or invalid values fail fast.

Step-by-step: [docs/environment.md](./docs/environment.md), [Sentry](./docs/setup/sentry.md), [Gmail](./docs/setup/contact-email.md), [GitHub activity](./docs/setup/github-activity.md).

### Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
pnpm build
pnpm start
```

---

## Scripts

| Command                             | Description                 |
| ----------------------------------- | --------------------------- |
| `pnpm dev`                          | Development server          |
| `pnpm build`                        | Production build            |
| `pnpm start`                        | Serve the production build  |
| `pnpm typecheck`                    | TypeScript (`tsc --noEmit`) |
| `pnpm lint` / `pnpm lint:fix`       | ESLint                      |
| `pnpm format` / `pnpm format:check` | Prettier                    |

---

## Project structure

```text
src/
├── app/                 # Routes, layouts, global styles
├── components/          # UI primitives, layout, shared pieces
├── config/              # Site config + validated env
├── features/            # Feature modules (hero, projects, contact, …)
├── hooks/               # Shared hooks
├── lib/                 # Framework helpers (e.g. `cn`)
├── providers/           # App providers
└── types/               # Shared TypeScript types
```

Feature code lives under `src/features/<name>/` with a public `index.ts` export surface. App routes stay thin and compose features.

---

## Deploy

The production site is hosted on [Vercel](https://vercel.com/).

1. Import the GitHub repo into a Vercel project.
2. Set the environment variables from `.env.example`.
3. Use the default Next.js build (`pnpm build`). Framework preset: Next.js.

More detail: **[docs/deploy-and-ci.md](./docs/deploy-and-ci.md)**.

---

## Docs

Longer guides live in **[`docs/`](./docs/README.md)** (architecture, [coding patterns](./docs/coding-patterns.md), env, Sentry / Gmail / GitHub setup, ADRs, deploy & CI).

---

## Contributing

This is a personal portfolio, but thoughtful PRs (docs, bugs, small a11y fixes) are welcome.

Please read **[CONTRIBUTING.md](./CONTRIBUTING.md)** before opening a PR:

- Branch from `development` (not `main`)
- Use [Conventional Commits](https://www.conventionalcommits.org/)
- Ensure `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, and `pnpm build` pass

Security issues: see **[SECURITY.md](./SECURITY.md)** — do not open a public issue for vulnerabilities.

---

<!-- ## License

Declared as **MIT** in `package.json`. -->

---

## Author

**Jakirul Islam Hakim** — Full Stack Developer

- Portfolio: [jakirul-islam-hakim.vercel.app](https://jakirul-islam-hakim.vercel.app/)
- GitHub: [jakirulislamhakim](https://github.com/jakirulislamhakim)
- Email: [jakirulislamhakim@gmail.com](mailto:jakirulislamhakim@gmail.com)
