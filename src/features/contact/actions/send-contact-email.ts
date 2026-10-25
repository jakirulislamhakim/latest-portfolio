'use server';

import path from 'node:path';
import nodemailer from 'nodemailer';
import { env } from '@/config/env';
import { SITE } from '@/config/site';
import { CONTACT_EMAIL_ADDRESS, CONTACT_FORM } from '../constants';
import { LOGO_CID, buildOwnerEmail, buildVisitorEmail } from '../email/contact-email-template';
import { contactFormSchema, readContactFieldErrors } from '../schema';
import type { TSendContactEmailResult } from '../types';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 587;

function readGmailAuth(): { user: string; pass: string } {
  const user = env.GMAIL_USER.trim();
  const pass = env.GMAIL_APP_PASSWORD.replaceAll(' ', '').trim();

  if (/[\r\n]/.test(user) || /[\r\n]/.test(pass)) {
    throw new Error('Gmail credentials contain a line break.');
  }

  return { user, pass };
}

export async function sendContactEmail(input: unknown): Promise<TSendContactEmailResult> {
  const parsed = contactFormSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: readContactFieldErrors(parsed.error) };
  }

  let auth: ReturnType<typeof readGmailAuth>;

  try {
    auth = readGmailAuth();
  } catch (error) {
    console.error('Contact email send failed.', error);
    return { ok: false, message: CONTACT_FORM.sendError };
  }

  const ownerEmail = buildOwnerEmail(parsed.data);
  const visitorEmail = buildVisitorEmail(parsed.data);
  const from = `${SITE.fullName} <${auth.user}>`;
  const logo = {
    filename: 'logo.png',
    path: path.join(process.cwd(), 'public', 'logo.png'),
    cid: LOGO_CID,
  };
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth,
  });

  try {
    try {
      await transport.sendMail({
        from,
        to: CONTACT_EMAIL_ADDRESS,
        replyTo: parsed.data.email,
        subject: ownerEmail.subject,
        html: ownerEmail.html,
        text: ownerEmail.text,
        attachments: [logo],
      });
    } catch (error) {
      console.error('Failed to send the portfolio contact note.', error);
      return { ok: false, message: CONTACT_FORM.sendError };
    }

    try {
      await transport.sendMail({
        from,
        to: parsed.data.email,
        subject: visitorEmail.subject,
        html: visitorEmail.html,
        text: visitorEmail.text,
        attachments: [logo],
      });
    } catch (error) {
      console.error('Failed to send the contact thank-you.', error);
    }

    return { ok: true };
  } finally {
    transport.close();
  }
}
