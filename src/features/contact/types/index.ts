export type TContactStatusItem = {
  id: string;
  label: string;
};

export type TContactActionKind = 'email' | 'phone' | 'external' | 'download' | 'internal';

export type TContactActionTone = 'primary' | 'secondary';

export type TContactActionIcon =
  'email' | 'phone' | 'linkedin' | 'whatsapp' | 'download' | 'services';

export type TContactAction = {
  id: string;
  label: string;
  href: string;
  kind: TContactActionKind;
  tone: TContactActionTone;
  icon: TContactActionIcon;
};

export type TContactStep = {
  id: string;
  number: string;
  label: string;
};

export type TContactFieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export type TSendContactEmailResult =
  { ok: true } | { ok: false; fieldErrors: TContactFieldErrors } | { ok: false; message: string };
