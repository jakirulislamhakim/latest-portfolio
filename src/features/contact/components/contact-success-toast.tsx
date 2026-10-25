import { Check, X } from 'lucide-react';

type TContactSuccessToastProps = {
  title: string;
  message: string;
  dismissLabel: string;
  onDismiss: () => void;
};

export function ContactSuccessToast({
  title,
  message,
  dismissLabel,
  onDismiss,
}: TContactSuccessToastProps) {
  function handleDismiss() {
    onDismiss();
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center p-4">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-lg"
      >
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <Check />
        </span>
        <div className="flex min-h-11 flex-1 flex-col justify-center gap-1">
          <p className="text-base font-semibold text-foreground">{title}</p>
          <p className="text-base leading-relaxed text-muted-foreground">{message}</p>
        </div>
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={handleDismiss}
          className="flex size-11 shrink-0 items-center justify-center rounded-lg text-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <X aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
