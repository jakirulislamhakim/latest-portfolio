'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CONTACT_FORM } from '../constants';

const contactFormSchema = z.object({
  name: z.string().min(2, CONTACT_FORM.nameError),
  email: z.email(CONTACT_FORM.emailError),
  message: z.string().min(15, CONTACT_FORM.messageError),
});

type TContactFieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

const FIELD_CLASS_NAME =
  'min-h-11 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive';

function readFormText(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

export function ContactForm() {
  const [fieldErrors, setFieldErrors] = useState<TContactFieldErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const parsed = contactFormSchema.safeParse({
      name: readFormText(formData, 'name'),
      email: readFormText(formData, 'email'),
      message: readFormText(formData, 'message'),
    });

    if (!parsed.success) {
      const fieldErrors = z.flattenError(parsed.error).fieldErrors;

      setFieldErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      });
      return;
    }

    setFieldErrors({});
    console.log(parsed.data);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-base font-medium text-foreground">
          {CONTACT_FORM.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={CONTACT_FORM.namePlaceholder}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
          className={FIELD_CLASS_NAME}
        />
        {fieldErrors.name ? (
          <p
            id="contact-name-error"
            role="alert"
            className="text-base leading-relaxed text-destructive"
          >
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-base font-medium text-foreground">
          {CONTACT_FORM.emailLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={CONTACT_FORM.emailPlaceholder}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
          className={FIELD_CLASS_NAME}
        />
        {fieldErrors.email ? (
          <p
            id="contact-email-error"
            role="alert"
            className="text-base leading-relaxed text-destructive"
          >
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-base font-medium text-foreground">
          {CONTACT_FORM.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={CONTACT_FORM.messagePlaceholder}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
          className={cn(FIELD_CLASS_NAME, 'min-h-32 py-3')}
        />
        {fieldErrors.message ? (
          <p
            id="contact-message-error"
            role="alert"
            className="text-base leading-relaxed text-destructive"
          >
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" className="w-full">
        {CONTACT_FORM.submitLabel}
      </Button>
    </form>
  );
}
