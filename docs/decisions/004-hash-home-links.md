# 004 — Home section links as `/#section`

## Context

Nav used bare hashes (`#projects`). From `/projects/[slug]`, those hashes point at the **current** URL, so the home section never loads. Re-clicking the same hash on the home page also often fails to scroll (browser treats it as “already there”).

## Decision

- Site nav (and related CTAs) use **`/#about`**, **`/#projects`**, etc.
- The navbar scrolls with `scrollIntoView` when the section exists on the page (same-hash re-click).

## Why

- One link works from home and from project detail.
- Matches user expectation: “Projects” always means the home projects block.

## Trade-off

Slightly longer hrefs. Footer/nav must stay in sync via `NAV_ITEMS` in `src/config/site.ts`.
