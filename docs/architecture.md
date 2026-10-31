# Architecture

This portfolio uses **Next.js App Router** with a **feature-based** layout under `src/`.

## Folder map

| Path                    | Role                                                                        |
| ----------------------- | --------------------------------------------------------------------------- |
| `src/app`               | Routes, layouts, metadata. Public pages live in the `(public)` route group. |
| `src/features/<name>`   | Feature UI, hooks, actions, constants, types. Main home of product code.    |
| `src/components/ui`     | Design-system primitives (shadcn / Base UI).                                |
| `src/components/layout` | Shell: navbar, footer, section wrappers.                                    |
| `src/components/shared` | Pieces reused by **two or more** features.                                  |
| `src/config`            | Site copy, nav, social links. `src/config/env` = validated env.             |
| `src/lib`               | Framework helpers (e.g. `cn`).                                              |
| `src/utils`             | Small pure helpers.                                                         |
| `src/hooks`             | Shared hooks (cross-feature).                                               |
| `src/providers`         | App-wide providers (theme, etc.).                                           |
| `src/types`             | Shared TypeScript types.                                                    |

## Feature module shape

```text
src/features/<feature-name>/
├── components/
├── hooks/          # only if needed
├── actions/        # server actions only if needed
├── types/
├── constants/
└── index.ts        # public exports only
```

**Rules of thumb**

- Used by one feature → keep it inside that feature.
- Used by two or more → move to `components/shared`, `hooks`, or `utils`.
- Do not import another feature’s internals; import only what its `index.ts` exports.
- Pages in `src/app` stay thin: compose features, no business logic.

## Current features

| Feature      | Purpose                               |
| ------------ | ------------------------------------- |
| `hero`       | Landing hero                          |
| `about`      | About section                         |
| `skills`     | Skills                                |
| `github`     | Contribution / activity calendar      |
| `terminal`   | Interactive terminal UI               |
| `projects`   | Home grid + `/projects/[slug]` detail |
| `services`   | Services                              |
| `experience` | Experience                            |
| `contact`    | Contact form + email action           |

## Server vs client

- **Default to Server Components** (pages, layouts, data fetching).
- Add `"use client"` only for state, effects, browser APIs, or event handlers — push it to leaf components.
- Env: never use `process.env.X` in app code. Import `{ env } from '@/config/env'`. See [environment.md](./environment.md).

## Styling

- Tailwind CSS v4 + design tokens in `src/app/globals.css`.
- Prefer semantic tokens (`primary`, `muted`, `border`) over hard-coded colors or arbitrary values.
- Reuse `components/ui` before inventing new primitives.
