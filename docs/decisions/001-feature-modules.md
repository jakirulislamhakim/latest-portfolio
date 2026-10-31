# 001 — Feature-based modules

## Context

The portfolio has many sections (hero, projects, contact, terminal, …). A flat `components/` tree mixes unrelated UI and makes ownership unclear.

## Decision

Put product code in `src/features/<name>/` with a public `index.ts`. Keep `src/app` pages thin.

## Why

- One place to find “everything about projects” or “contact”.
- Clear import boundary between features.
- Matches how the team (and agents) are instructed in `AGENTS.md`.

## Trade-off

Slightly more folders than a tiny brochure site. Shared UI must be promoted carefully (only after 2+ features need it) to avoid a premature `shared/` dump.
