# 005 — Documented coding patterns

## Context

`AGENTS.md` holds full maintainer/agent rules. Public contributors need a shorter, readable guide without digging through agent instructions.

## Decision

Keep a human-facing summary at [`docs/coding-patterns.md`](../coding-patterns.md), linked from `docs/README.md` and the root README. `AGENTS.md` remains the detailed source for agents and hard rules.

## Why

- Onboarding and PR review stay consistent.
- Contributors see naming, TS, React, and styling rules in one place.
- Avoids duplicating every agent-only workflow (permissions, git bans) into public docs.

## Trade-off

Two docs can drift. When a convention changes, update **both** `AGENTS.md` and `coding-patterns.md` (or trim the public page and point to the section that stayed in sync).
