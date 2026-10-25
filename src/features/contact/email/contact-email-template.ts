import { SITE, SOCIAL_LINKS } from '@/config/site';
import type { TSocialLink } from '@/config/site';
import type { TContactFormInput } from '../schema';

export const LOGO_CID = 'logo';

const EMAIL_SOCIAL_IDS = ['github', 'linkedin', 'facebook', 'whatsapp'] as const;

// Hex stand-ins for the light-theme oklch tokens. Gmail cannot read oklch() or CSS variables.
// primary             #6d28d9  oklch(0.5 0.24 295)
// primary-foreground  #faf8ff  oklch(0.98 0.005 290)
// background          #f7f6fb  oklch(0.995 0.002 285)
// card                #ffffff  oklch(1 0 0)
// foreground          #241c33  oklch(0.145 0.015 285)
// muted               #f4f2f8  oklch(0.955 0.012 280)
// muted-foreground    #6f6880  oklch(0.52 0.025 280)
// border              #e6e3ee  oklch(0.915 0.01 280)
const EMAIL_COLORS = {
  primary: '#6d28d9',
  primaryForeground: '#faf8ff',
  page: '#f7f6fb',
  card: '#ffffff',
  text: '#241c33',
  muted: '#f4f2f8',
  mutedText: '#6f6880',
  border: '#e6e3ee',
} as const;

const EMAIL_FONT = 'Arial, Helvetica, sans-serif';

type TContactEmailContent = {
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function requireSocialLink(id: string): TSocialLink {
  const link = SOCIAL_LINKS.find((item) => item.id === id);

  if (!link) {
    throw new Error(`Missing social link: ${id}`);
  }

  return link;
}

function contactSocialLinks() {
  return EMAIL_SOCIAL_IDS.map((id) => requireSocialLink(id));
}

function emailFooterLinks() {
  return [
    { name: 'Website', href: SITE.url },
    ...contactSocialLinks().map((link) => ({ name: link.name, href: link.href })),
  ];
}

function renderSocialHtml(): string {
  return emailFooterLinks()
    .map((link) => {
      const href = escapeHtml(link.href);
      const name = escapeHtml(link.name);

      return `<a href="${href}" style="color:${EMAIL_COLORS.primary};font-weight:700;text-decoration:none;">${name}</a>`;
    })
    .join(`<span style="color:${EMAIL_COLORS.mutedText};"> &nbsp;|&nbsp; </span>`);
}

function renderSocialText(): string {
  return emailFooterLinks()
    .map((link) => `${link.name}: ${link.href}`)
    .join('\n');
}

function formatReceivedAt(date: Date): string {
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: SITE.timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(date)
    .replaceAll('\u202f', ' ');

  const calendarDate = new Intl.DateTimeFormat('en-GB', {
    timeZone: SITE.timezone,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return `${time} , ${calendarDate}`;
}

function localPhoneLabel(phone: string): string {
  if (!phone.startsWith('+88')) {
    return phone;
  }

  return phone.slice(3);
}

function renderVisitorMessage(safeMessage: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;background:${EMAIL_COLORS.muted};border-radius:8px;">
  <tr>
    <td style="padding:12px 16px;font-family:${EMAIL_FONT};">
      <p style="margin:0 0 4px;font-size:12px;line-height:1.4;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${EMAIL_COLORS.mutedText};">Your message</p>
      <p style="margin:0;font-size:16px;line-height:1.5;color:${EMAIL_COLORS.text};white-space:pre-wrap;">${safeMessage}</p>
    </td>
  </tr>
</table>`;
}

function renderEmail(
  bodyHtml: string,
  bodyText: string
): Pick<TContactEmailContent, 'html' | 'text'> {
  const name = escapeHtml(SITE.fullName);
  const role = escapeHtml(SITE.role);
  const year = new Date().getFullYear();

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body { margin: 0; padding: 0; background: ${EMAIL_COLORS.page}; }
    </style>
  </head>
  <body style="margin:0;padding:0;background:${EMAIL_COLORS.page};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${EMAIL_COLORS.page};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${EMAIL_COLORS.card};border:1px solid ${EMAIL_COLORS.border};border-radius:12px;">
            <tr>
              <td style="padding:32px 28px;font-family:${EMAIL_FONT};color:${EMAIL_COLORS.text};text-align:left;">
                <img src="cid:${LOGO_CID}" alt="${name}" width="80" height="80" style="display:block;margin:0 auto 16px;border:0;" />
                <p style="margin:0;font-size:24px;line-height:1.3;font-weight:700;text-align:center;color:${EMAIL_COLORS.primary};">${name}</p>
                <p style="margin:4px 0 0;font-size:14px;line-height:1.4;color:${EMAIL_COLORS.mutedText};text-align:center;">${role}</p>
                <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin:20px auto;">
                  <tr>
                    <td width="64" height="4" bgcolor="${EMAIL_COLORS.primary}" style="width:64px;height:4px;background-color:${EMAIL_COLORS.primary};font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                </table>
                ${bodyHtml}
                <p style="margin:28px 0 0;font-size:14px;line-height:1.6;text-align:center;">${renderSocialHtml()}</p>
                <p style="margin:16px 0 0;font-size:14px;line-height:1.5;text-align:center;color:${EMAIL_COLORS.mutedText};">&copy; ${year} ${name}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `${SITE.fullName}
${SITE.role}

${bodyText}

${renderSocialText()}

© ${year} ${SITE.fullName}`;

  return { html, text };
}

export function buildOwnerEmail(input: TContactFormInput): TContactEmailContent {
  const name = singleLine(input.name);
  const email = singleLine(input.email);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(input.message);
  const receivedAt = formatReceivedAt(new Date());
  const safeReceivedAt = escapeHtml(receivedAt);

  const bodyHtml = `<h1 style="margin:0 0 16px;font-size:18px;line-height:1.4;font-weight:700;">New message from your portfolio</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${EMAIL_COLORS.muted};border-radius:8px;">
  <tr>
    <td style="padding:16px;font-family:${EMAIL_FONT};font-size:15px;line-height:1.6;color:${EMAIL_COLORS.text};">
      <p style="margin:0 0 8px;"><strong>Name</strong><br />${safeName}</p>
      <p style="margin:0 0 8px;"><strong>Email</strong><br /><a href="mailto:${safeEmail}" style="color:${EMAIL_COLORS.primary};">${safeEmail}</a></p>
      <p style="margin:0 0 8px;"><strong>Received</strong><br />${safeReceivedAt}</p>
      <p style="margin:0;"><strong>Message</strong><br /><span style="white-space:pre-wrap;">${safeMessage}</span></p>
    </td>
  </tr>
</table>`;

  const bodyText = `New message from your portfolio

Name: ${name}
Email: ${email}
Received: ${receivedAt}

Message:
${input.message}`;

  return {
    subject: `Portfolio message from ${name}`,
    ...renderEmail(bodyHtml, bodyText),
  };
}

export function buildVisitorEmail(input: TContactFormInput): TContactEmailContent {
  const name = singleLine(input.name);
  const safeName = escapeHtml(name);
  const fullName = escapeHtml(SITE.fullName);
  const role = escapeHtml(SITE.role);
  const safeMessage = escapeHtml(input.message);
  const phoneLabel = escapeHtml(localPhoneLabel(SITE.phone));
  const phoneHref = escapeHtml(`tel:${SITE.phone}`);

  const bodyHtml = `<p style="margin:0 0 16px;font-size:16px;line-height:1.8;">Hello <strong>${safeName}</strong>,</p>
<p style="margin:0 0 16px;font-size:16px;line-height:1.8;">We've received your message, and our team will get back to you within 24-48 hours.</p>
${renderVisitorMessage(safeMessage)}
<p style="margin:0;font-size:16px;line-height:1.8;">If it's urgent, feel free to call us directly: <a href="${phoneHref}" style="color:${EMAIL_COLORS.primary};font-weight:700;text-decoration:underline;">${phoneLabel}</a></p>
<p style="margin:16px 0 4px;font-size:16px;line-height:1.8;">Best regards,</p>
<p style="margin:0;font-size:16px;line-height:1.8;"><strong>${fullName}</strong><br />${role}</p>`;

  const bodyText = `Hello ${name},

We've received your message, and our team will get back to you within 24-48 hours.

Your message:
${input.message}

If it's urgent, feel free to call us directly: ${localPhoneLabel(SITE.phone)}

Best regards,
${SITE.fullName}
${SITE.role}`;

  return {
    subject: 'Thank you for reaching out',
    ...renderEmail(bodyHtml, bodyText),
  };
}
