# 006 — Primary nav + More menu

## Context

The desktop navbar listed eight section links. On tablet (`md`), the row overflowed beside the brand, theme toggle, and CTA. A Blog link is planned soon, which would make overflow worse.

## Decision

- **Desktop primary:** About · Projects · Services · Experience (+ Blog when `NAV_BLOG_ITEM.enabled`)
- **Desktop More menu:** Skills · Activity · Terminal · Contact (Base UI `Menu`)
- **Contact:** Also in the Let’s Talk CTA; still in mobile sheet + footer
- **Mobile / footer:** full `NAV_ITEMS` list unchanged
- Config: `NAV_PRIMARY_ITEMS`, `NAV_MORE_ITEMS`, `NAV_BLOG_ITEM` in `src/config/site.ts`

## Why

- Fits tablet without wrapping or shrinking type uncomfortably.
- Keeps secondary sections reachable without cluttering the first row.
- Blog can join the primary row later by flipping `enabled` — no dead link until `/blog` exists.

## Trade-off

One extra click for Skills / Activity / Terminal on desktop. Acceptable vs a broken tablet layout.
