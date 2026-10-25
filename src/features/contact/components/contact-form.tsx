'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { sendContactEmail } from '../actions/send-contact-email';
import { CONTACT_FORM } from '../constants';
import { contactFormSchema, readContactFieldErrors } from '../schema';
import type { TContactFieldErrors } from '../types';
import { ContactSuccessToast } from './contact-success-toast';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (!isSent) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSent(false);
    }, CONTACT_FORM.successDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSent]);

  function handleDismissSuccess() {
    setIsSent(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = contactFormSchema.safeParse({
      name: readFormText(formData, 'name'),
      email: readFormText(formData, 'email'),
      message: readFormText(formData, 'message'),
    });

    setIsSent(false);
    setSubmitError(undefined);

    if (!parsed.success) {
      setFieldErrors(readContactFieldErrors(parsed.error));
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(parsed.data);

      if (!result.ok) {
        if ('fieldErrors' in result) {
          setFieldErrors(result.fieldErrors);
          return;
        }

        setSubmitError(result.message);
        return;
      }

      form.reset();
      setIsSent(true);
    } catch (error) {
      console.error('Contact form submit failed.', error);
      setSubmitError(CONTACT_FORM.sendError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? CONTACT_FORM.sendingLabel : CONTACT_FORM.submitLabel}
        </Button>
        {submitError ? (
          <p role="alert" className="text-base leading-relaxed text-destructive">
            {submitError}
          </p>
        ) : null}
      </form>
      {isSent ? (
        <ContactSuccessToast
          title={CONTACT_FORM.successTitle}
          message={CONTACT_FORM.successNote}
          dismissLabel={CONTACT_FORM.dismissSuccessLabel}
          onDismiss={handleDismissSuccess}
        />
      ) : null}
    </>
  );
}
