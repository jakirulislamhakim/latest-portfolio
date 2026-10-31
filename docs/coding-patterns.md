# Coding patterns

Conventions used across this portfolio. Follow these so new code matches the rest of the repo. Deeper agent/maintainer rules live in [`AGENTS.md`](../AGENTS.md); this page is the human-friendly summary.

Related: [Architecture](./architecture.md) · [Environment](./environment.md) · [Decisions](./decisions/README.md)

---

## Tooling

- **pnpm only** — never `npm` or `yarn`.
- **Node** `>= 20`.
- After a feature is done: `pnpm typecheck` then `pnpm build`. Fix root causes; do not silence errors with `any`, loose `as`, `@ts-ignore`, or `eslint-disable`.
- Commits: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, …). See [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## Placement & imports

| Need                 | Put it here                              |
| -------------------- | ---------------------------------------- |
| One feature only     | Inside `src/features/<name>/`            |
| Two or more features | `components/shared`, `hooks`, or `utils` |
| Design primitive     | Prefer `components/ui` first             |
| Site copy / nav      | `src/config` or the feature `constants/` |

- Import with the `@/*` alias (`@/components/...`, `@/lib/...`). No deep `../../../` paths.
- Import another feature **only** through its `index.ts`.
- Keep `src/app` pages thin: compose features, no business logic.
- Before adding a component, hook, util, or token — **search and reuse** what already exists.

---

## Naming

| Kind              | Pattern              | Example                         |
| ----------------- | -------------------- | ------------------------------- |
| Components        | `PascalCase`         | `ProjectCard`                   |
| Functions / vars  | `camelCase`          | `getProjectById`                |
| Hooks             | `use` + `PascalCase` | `useScrollSpy`                  |
| Constants         | `UPPER_SNAKE_CASE`   | `MAX_PROJECTS`                  |
| Types             | `T` + `PascalCase`   | `TProject`, `TProjectCardProps` |
| Interfaces (rare) | `I` + `PascalCase`   | `IThemeContract`                |
| Files / folders   | `kebab-case`         | `project-card.tsx`              |

Booleans read like questions: `isOpen`, `hasError`, `canSubmit`.  
Unused args/vars: prefix with `_` (e.g. `_event`).

---

## TypeScript

- Strict mode. Prefer `type` over `interface` unless you need extension / merging.
- **No `any`.** Prefer `unknown` + narrowing or Zod.
- Avoid `as` casts (except `as const`).
- Type-only imports: `import type { TProject } from '...'`.
- Config arrays / maps: `as const` for literal types.

---

## React & Next.js

- **Default to Server Components.** Add `"use client"` only for state, effects, events, or browser APIs — push it to leaf components.
- Prefer deriving values in render or in event handlers over `useEffect`. If you use an effect, always clean up (timers, listeners, `AbortController`).
- **No inline handlers in JSX** (`onClick={() => ...}`). Use named functions (`handleSubmit`). For list items, extract an item component that owns its handler.
- List `key`s: stable ids — never array index or `Math.random()`.
- Images: `next/image`. Internal links: `next/link`.
- Do not default to `useMemo` / `useCallback` / `React.memo` — the React Compiler covers most cases.
- No direct DOM hacks (`document.querySelector`, `innerHTML`) when React state/refs can do the job.
- Env: `import { env } from '@/config/env'` — never `process.env.X` in app code.

---

## Styling

- **Mobile-first:** base → `md:` → `lg:` (avoid `sm:` unless needed).
- Tokens live in `src/app/globals.css`. Use semantic classes (`bg-primary`, `text-muted-foreground`, `shadow-sm`) — not raw hex, `bg-blue-500`, or one-off `p-[13px]`.
- Merge classes with `cn()` from `@/lib/utils`.
- Variants: `class-variance-authority` (`cva`).
- No inline `style={{ ... }}` and no `!important`.
- Do **not** override heading sizes with ad-hoc `text-3xl` / `md:text-5xl` in JSX — change `--heading-*` in `globals.css` instead.
- Prefer existing `components/ui` primitives over custom one-offs.

---

## Accessibility & HTML

- Semantic tags: `header`, `nav`, `main`, `section`, `button`, lists, etc.
- One `h1` per page; heading levels in order (`h1` → `h2` → `h3`).
- Interactive controls need keyboard access, visible focus, and ~44×44px touch targets on mobile (`min-h-11 min-w-11` where it fits).
- Meaningful `alt` text (or `alt=""` if decorative). Labels on form controls.
- Respect `prefers-reduced-motion` for non-essential motion.

---

## Clean code habits

- Prefer simple, readable code over clever abstractions (**KISS**).
- Small, single-purpose functions and components.
- Fail fast with early returns instead of deep nesting.
- Do not force DRY across unrelated features — duplication is cheaper than the wrong shared abstraction (design tokens are the exception: centralize those early).
- No empty `catch`. Log, rethrow, return a typed error, or report via Sentry.
- Comments explain **why**, not what. Avoid noise.

---

## Quick checklist before a PR

- [ ] Code sits in the right feature / shared folder
- [ ] Types use `T…`; no `any` / drive-by `as`
- [ ] Client boundary is as small as possible
- [ ] Handlers are named; list keys are stable
- [ ] Styles use tokens + `cn()`
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm build` pass
