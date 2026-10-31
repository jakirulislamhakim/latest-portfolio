# Setup: GitHub activity calendar

The GitHub activity section loads contribution data through GitHub’s **GraphQL** API. Anonymous calls are rejected, so a token is required.

## Token name

Use **`GH_ACTIVITY_TOKEN`** — not `GITHUB_TOKEN` / `GITHUB_*`.

**Why:** GitHub Actions rejects repository secrets whose names start with `GITHUB_`.

## Create a token

1. GitHub → **Settings → Developer settings → Personal access tokens**.
2. Create a **fine-grained** or **classic** token.
3. Scopes: enough to read public contribution/calendar data for your user (for a public profile, a fine-grained token with read access to the relevant resources is typical; classic often uses `read:user` as a starting point — adjust to the least privilege that works).

## `.env.local`

```bash
GH_ACTIVITY_TOKEN="ghp_..."   # or fine-grained token value
```

## Production & CI

Add `GH_ACTIVITY_TOKEN` to:

- Vercel environment variables
- GitHub Actions repository secrets

CI uses it during `pnpm build` because the env schema requires it.
