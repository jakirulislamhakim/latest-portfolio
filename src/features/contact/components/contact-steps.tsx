import { CONTACT_CONTENT, CONTACT_STEPS } from '../constants';
import type { TContactStep } from '../types';

type TContactStepItemProps = {
  step: TContactStep;
  isLast: boolean;
};

function ContactStepItem({ step, isLast }: TContactStepItemProps) {
  return (
    <li className="relative flex flex-1 items-start gap-4 md:flex-col md:items-center md:px-3 md:text-center">
      <div className="flex flex-col items-center self-stretch md:self-auto">
        <span
          aria-hidden="true"
          className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
        >
          {step.number}
        </span>
        {isLast ? null : (
          <span aria-hidden="true" className="min-h-8 w-px flex-1 bg-border md:hidden" />
        )}
      </div>

      <p className="flex min-h-11 items-center text-base leading-relaxed text-foreground md:block md:min-h-0 md:px-2 md:pt-3">
        {step.label}
      </p>

      {isLast ? null : (
        <span
          aria-hidden="true"
          className="absolute top-5.5 left-[calc(50%+1.375rem)] hidden h-px w-[calc(100%-2.75rem)] bg-border md:block"
        />
      )}
    </li>
  );
}

export function ContactSteps() {
  const lastStepId = CONTACT_STEPS[CONTACT_STEPS.length - 1]?.id;

  return (
    <div className="mt-8">
      <p className="text-md text-start font-semibold tracking-wide text-muted-foreground md:text-center">
        {CONTACT_CONTENT.stepsLabel}
      </p>

      <ol
        aria-label={CONTACT_CONTENT.stepsLabel}
        className="relative mt-4 flex flex-col md:flex-row"
      >
        {CONTACT_STEPS.map((step) => (
          <ContactStepItem key={step.id} step={step} isLast={step.id === lastStepId} />
        ))}
      </ol>
    </div>
  );
}
