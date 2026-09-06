<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Instructions & Agent Guidelines

## 1. Tech Stack & Tooling

- **Framework**: Next.js 16.3 (App Router)
- **Library**: React 19 (`react` & `react-dom` 19.2+)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) with CSS variables in `src/app/globals.css`
- **UI Primitives**: Base UI (`@base-ui/react`), `shadcn/ui`, `lucide-react`, `tw-animate-css`
- **Language**: TypeScript 5 (Strict Mode enabled)
- **Package Manager**: `pnpm` (use `pnpm` commands exclusively)

---

## 2. Common Scripts & Commands

| Command             | Purpose                                                        |
| :------------------ | :------------------------------------------------------------- |
| `pnpm dev`          | Starts the Next.js local development server                    |
| `pnpm build`        | Compiles the production build                                  |
| `pnpm start`        | Runs the production build server                               |
| `pnpm typecheck`    | Validates TypeScript types across the project (`tsc --noEmit`) |
| `pnpm lint`         | Runs ESLint 9 across all project files                         |
| `pnpm lint:fix`     | Runs ESLint and auto-fixes fixable violations                  |
| `pnpm format`       | Formats all files with Prettier                                |
| `pnpm format:check` | Checks formatting without modifying files                      |
| `pnpm run prepare`  | Installs Husky git hooks in local dev environments             |

---

## 3. Git Hooks & Commit Automation (Husky)

The repository enforces code quality and commit standards via **Husky v9**:

### Hook Lifecycle

1. **`pre-commit`** (`.husky/pre-commit`):
   - Runs `pnpm exec lint-staged`.
   - Staged `*.{ts,tsx,mts}` and `*.{js,mjs,cjs}` files are automatically checked/fixed with `eslint --fix` and formatted with `prettier --write`.
   - Staged `*.{json,css,md}` files are formatted with `prettier --write`.
2. **`commit-msg`** (`.husky/commit-msg`):
   - Runs `pnpm exec commitlint --edit "$1"`.
   - Validates the commit message against the **Conventional Commits** specification.
3. **`pre-push`** (`.husky/pre-push`):
   - Runs `pnpm typecheck`.
   - Prevents code with TypeScript errors from being pushed to remote branches.

### Commit Message Rules

All commits must follow the Conventional Commits format: `<type>: <subject>`

**Allowed types**:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc. (no code logic change)
- `refactor`: Refactoring production code (neither fixes a bug nor adds a feature)
- `perf`: Performance improvements
- `test`: Adding or refactoring tests
- `build`: Build system or external dependency updates
- `ci`: CI configuration files or scripts
- `chore`: Maintenance tasks that do not touch `src` or test files
- `revert`: Reverting a previous commit

**Examples**:

- `feat: add project showcase section`
- `fix: resolve mobile navigation backdrop blur`
- `chore: update tailwind configuration`

### CI & Production Environments

- Husky installation via `.husky/install.mjs` automatically skips when `NODE_ENV === 'production'` or `CI === 'true'`.
- Do not bypass hooks (`--no-verify`) unless explicitly instructed by the repository owner for an emergency fix.

---

## 4. Code Quality & Conventions

- **Imports**:
  - Always use the `@/*` alias for imports within `src/` (e.g., `@/components/...`, `@/lib/...`).
  - Use explicit type imports: `import type { ... } from '...'`.
- **Unused Variables**:
  - Prefix intentionally unused variables or arguments with an underscore (e.g. `_event`, `_index`).
- **ESLint & Prettier**:
  - Console statements in application code trigger ESLint warnings; use `console.warn` or `console.error` when logging is needed, or remove debugging logs before committing.
  - Husky helper scripts in `.husky/**` are ignored by ESLint.
