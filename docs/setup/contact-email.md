# Setup: Contact form email (Gmail)

The contact form sends mail with **Nodemailer** via a server action (`src/features/contact/actions/send-contact-email.ts`).

## Why an app password?

Gmail blocks normal account passwords for SMTP from apps. You need:

1. **2-Step Verification** on the Google account.
2. An **App password** (Google Account → Security → App passwords).

Use that 16-character app password as `GMAIL_APP_PASSWORD` — not your login password.

## `.env.local`

```bash
GMAIL_USER="you@gmail.com"
GMAIL_APP_PASSWORD="xxxx xxxx xxxx xxxx"
```

Spaces in the app password are fine; Google often shows them in groups of four.

## Production

Set the same variables on **Vercel** (Production / Preview as needed).

For **GitHub Actions**, the build only needs the variables to exist so env validation passes. Dummy values are OK in CI secrets if the contact form is not exercised in CI. The live host needs the real app password.

## Security

- Never commit `.env.local`.
- Prefer a dedicated Gmail (or Google Workspace) mailbox for the site if you can.
- Rotate the app password if it leaks.
