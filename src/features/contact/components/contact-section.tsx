import { SectionLayout } from '@/components/layout/section-layout';
import { PillList } from '@/components/shared/pill-list';
import {
  CONTACT_ACTIONS,
  CONTACT_CONTENT,
  CONTACT_FORM,
  CONTACT_PANEL,
  CONTACT_STATUS,
} from '../constants';
import { ContactActionList } from './contact-path-card';
import { ContactForm } from './contact-form';
import { ContactSteps } from './contact-steps';

export function ContactSection() {
  return (
    <SectionLayout id="contact" aria-labelledby="contact-heading">
      {/* Heading and intro */}
      <div className="text-center">
        <h2 id="contact-heading">{CONTACT_CONTENT.heading}</h2>
        <p className="mx-auto mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
          {CONTACT_CONTENT.intro}
        </p>
      </div>

      <PillList
        className="mt-6 justify-center md:gap-3"
        items={CONTACT_STATUS}
        label={CONTACT_CONTENT.statusLabel}
      />

      {/* Contact panel and form */}
      <div className="mt-8 rounded-lg p-3 md:p-4">
        <div className="grid items-stretch gap-3 lg:grid-cols-2">
          {/* Contact panel */}
          <div className="flex flex-col justify-start gap-4 rounded-lg border border-border p-5 text-center md:p-6">
            <a
              href={CONTACT_PANEL.href}
              className="group flex flex-col gap-2 rounded-lg text-start outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <h3 className="transition-colors group-hover:text-primary">{CONTACT_PANEL.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                {CONTACT_PANEL.description}
              </p>
            </a>

            <div className="flex flex-1 items-center">
              <ContactActionList actions={CONTACT_ACTIONS} />
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-lg border border-border p-5 md:p-6">
            <h3 className="text-start">{CONTACT_FORM.heading}</h3>
            <p className="mt-2 text-start text-base leading-relaxed text-muted-foreground">
              {CONTACT_FORM.description}
            </p>
            <ContactForm />
          </div>
        </div>
      </div>

      <ContactSteps />
    </SectionLayout>
  );
}
