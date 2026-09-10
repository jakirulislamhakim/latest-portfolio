# Branch Protection & Governance

This document establishes the official GitHub branch protection rules, quality gates, and branch lifecycle strategy for this repository.

Protection rules are configured in GitHub via: **Settings → Branches → Add branch protection rule** (or via **Settings → Rules → Rulesets**).

---

## 1. Branching Strategy & Flow

We adhere to a trunk-adjacent promotion model designed for continuous integration and safe production deployments:

```
┌──────────────┐      Pull Request       ┌───────────────┐      Pull Request       ┌────────────┐      Auto-Deploy      ┌──────────────────┐
│  feature/*   │ ──────────────────────► │  development  │ ──────────────────────► │    main    │ ────────────────────► │ Production │
└──────────────┘   (Lint, Type, Build)   └───────────────┘  (Strict Quality Gates) └────────────┘                       └──────────────────┘
```

| Branch            | Classification        |     Push Access     | Allowed Merge Source            | Deployment Environment |
| :---------------- | :-------------------- | :-----------------: | :------------------------------ | :--------------------- |
| **`main`**        | Production            | ❌ No direct pushes | `development` branch only       | Vercel (Production)    |
| **`development`** | Staging / Integration | ❌ No direct pushes | `feature/*`, `fix/*`, `chore/*` | Vercel (Preview)       |
| **`feature/*`**   | Working / Topic       |   ✅ Author push    | Branched from `development`     | Local development      |

> [!IMPORTANT]
> PRs directly targeting `main` from forks or topic branches will be automatically rejected by the [`validate-pr-target`](.github/workflows/validate-pr-target.yml) workflow. All code must first land in `development`.

---

## 2. Protection Rules: `main` (Production)

The `main` branch directly reflects production code deployed to Vercel. Protections here are strict and non-bypassable.

### Pull Request Settings

- [x] **Require a pull request before merging**
  - **Required approvals**: `0` _(for solo maintainer; switch to `1` when collaborating)_
  - [x] **Dismiss stale pull request approvals when new commits are pushed**
  - [x] **Require conversation resolution before merging**
- [x] **Require linear history** _(enforces clean squash or rebase merge; prevents merge commits)_

### Required Status Checks

- [x] **Require status checks to pass before merging**
- [x] **Require branches to be up to date before merging** _(strict branch rebase validation)_

The following jobs from our CI/CD workflows **must** pass:

| Status Check Name          | Defining Workflow                                                    | Purpose                                                          |
| :------------------------- | :------------------------------------------------------------------- | :--------------------------------------------------------------- |
| `Check PR Source & Author` | [`validate-pr-target.yml`](.github/workflows/validate-pr-target.yml) | Enforces PR originates strictly from `development` by repo owner |
| `Install Dependencies`     | [`ci.yml`](.github/workflows/ci.yml)                                 | Verifies clean `pnpm install --frozen-lockfile`                  |
| `Lint`                     | [`ci.yml`](.github/workflows/ci.yml)                                 | Validates ESLint rules across all files                          |
| `Type Check`               | [`ci.yml`](.github/workflows/ci.yml)                                 | Strict TypeScript compiler check (`tsc --noEmit`)                |
| `Format Check`             | [`ci.yml`](.github/workflows/ci.yml)                                 | Enforces Prettier code formatting                                |
| `Build`                    | [`ci.yml`](.github/workflows/ci.yml)                                 | Verifies production Next.js build compilation                    |
| `Secret Scanning`          | [`ci.yml`](.github/workflows/ci.yml)                                 | Scans for leaked keys and credentials via Gitleaks               |
| `CodeQL Analysis`          | [`ci.yml`](.github/workflows/ci.yml)                                 | Deep static application security testing (SAST)                  |
| `Security Audit`           | [`ci.yml`](.github/workflows/ci.yml)                                 | Checks for known npm package CVEs (`pnpm audit`)                 |

### Push & Deletion Restrictions

- [x] **Do not allow bypassing the above settings** _(applies to administrators as well)_
- [x] **Block force pushes**
- [x] **Block deletions**
- [x] **Restrict who can push to matching branches** _(only allow PR merges)_

---

## 3. Protection Rules: `development` (Integration)

The `development` branch serves as the integration staging ground where all features and fixes converge.

### Pull Request Settings

- [x] **Require a pull request before merging**
  - **Required approvals**: `0` _(solo maintainer)_
  - [x] **Dismiss stale pull request approvals when new commits are pushed**
  - [x] **Require conversation resolution before merging**

### Required Status Checks

- [x] **Require status checks to pass before merging**
- [x] **Require branches to be up to date before merging**

Required jobs for `development`:

| Status Check Name      | Defining Workflow                    | Purpose                                        |
| :--------------------- | :----------------------------------- | :--------------------------------------------- |
| `Install Dependencies` | [`ci.yml`](.github/workflows/ci.yml) | Verifies package lockfile integrity            |
| `Lint`                 | [`ci.yml`](.github/workflows/ci.yml) | Enforces zero lint errors                      |
| `Type Check`           | [`ci.yml`](.github/workflows/ci.yml) | Enforces TypeScript strictness                 |
| `Format Check`         | [`ci.yml`](.github/workflows/ci.yml) | Validates codebase formatting                  |
| `Build`                | [`ci.yml`](.github/workflows/ci.yml) | Prevents broken bundles from entering staging  |
| `Security Audit`       | [`ci.yml`](.github/workflows/ci.yml) | Flags high-severity dependency vulnerabilities |

> [!NOTE]
> `CodeQL Analysis` and `Secret Scanning` are omitted from `development` requirements to maintain fast CI turnaround times during rapid iteration, but are fully enforced prior to merging into `main`.

### Push & Deletion Restrictions

- [x] **Do not allow bypassing the above settings**
- [x] **Block force pushes**
- [x] **Block deletions**
- [x] **Restrict who can push to matching branches** _(only allow PR merges)_

---

## 4. GitHub Setup Guide

### Method A: Classic Branch Protection Rules (Standard)

1. Open your repository on GitHub.
2. Navigate to **Settings** → **Branches** (under _Code and automation_).
3. Click **Add branch protection rule**.
4. Configure rule for **`main`**:
   - **Branch name pattern**: `main`
   - Enable the checkboxes matching Section 2 above.
   - Under **Require status checks to pass before merging**, search and select each check name.
   - Click **Save changes**.
5. Repeat steps 3 & 4 for **`development`** using the settings in Section 3.

> [!TIP]
> Status checks only appear in GitHub's search dropdown **after the CI workflow has run at least once** on a PR targeting that branch. If a check is missing from the list, open a draft PR to trigger the workflow.

---

### Method B: Modern GitHub Rulesets (Recommended)

If using GitHub Repository Rulesets (**Settings → Rules → Rulesets**):

1. Click **New ruleset** → **New branch ruleset**.
2. **Ruleset Name**: `Production Protection (main)`
3. **Enforcement status**: `Active`
4. **Target branches**: Include default branch (`main`).
5. **Branch rules**:
   - ✅ Restrict deletions
   - ✅ Block force pushes
   - ✅ Require linear history
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging (add the checks listed in Section 2).

---

## 5. Summary of Associated Automation

| File                                                                                   | Type     | Trigger                            | Function                                            |
| :------------------------------------------------------------------------------------- | :------- | :--------------------------------- | :-------------------------------------------------- |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml)                                 | Workflow | Push & PR to `main`, `development` | Lint, typecheck, format, build, audit, SAST         |
| [`.github/workflows/validate-pr-target.yml`](.github/workflows/validate-pr-target.yml) | Workflow | PR to `main`                       | Validates target source (`development`) & author    |
| [`.github/workflows/release.yml`](.github/workflows/release.yml)                       | Workflow | Manual (`workflow_dispatch`)       | Tags releases, updates changelog, publishes release |
| [`.github/workflows/lighthouse.yml`](.github/workflows/lighthouse.yml)                 | Workflow | Scheduled / PR                     | Audits web vitals and accessibility                 |
| [`.github/workflows/dependency-audit.yml`](.github/workflows/dependency-audit.yml)     | Workflow | Scheduled weekly                   | Automated security audit of dependencies            |
