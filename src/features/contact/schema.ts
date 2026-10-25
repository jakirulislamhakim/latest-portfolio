import { z } from 'zod';
import { CONTACT_FORM } from './constants';
import type { TContactFieldErrors } from './types';

export const contactFormSchema = z.object({
  name: z.string().min(2, CONTACT_FORM.nameError),
  email: z.email(CONTACT_FORM.emailError),
  message: z.string().min(15, CONTACT_FORM.messageError),
});

export type TContactFormInput = z.infer<typeof contactFormSchema>;

export function readContactFieldErrors(error: z.ZodError<TContactFormInput>): TContactFieldErrors {
  const fieldErrors = z.flattenError(error).fieldErrors;

  return {
    name: fieldErrors.name?.[0],
    email: fieldErrors.email?.[0],
    message: fieldErrors.message?.[0],
  };
}
