export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Outer pulsing ring */}
      <div className="relative flex size-28 items-center justify-center">
        {/* Animated ring layer 1 — slow breathe */}
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-loading-ring rounded-full border border-primary/20"
          style={{ animationDelay: '0s' }}
        />
        {/* Animated ring layer 2 — offset breathe for depth */}
        <span
          aria-hidden="true"
          className="absolute inset-2 animate-loading-ring rounded-full border border-primary/30"
          style={{ animationDelay: '0.4s' }}
        />

        {/* Inner circle with gradient background */}
        <div className="relative z-10 flex size-20 items-center justify-center rounded-full bg-linear-to-br from-primary/15 via-primary/8 to-chart-2/10 shadow-sm ring-1 ring-primary/20">
          {/* JIH monogram */}
          <span className="bg-linear-to-r from-primary via-chart-2 to-primary bg-clip-text font-heading text-2xl font-bold tracking-wide text-transparent select-none">
            JIH
          </span>
        </div>
      </div>

      {/* Name + role — fade up with delay */}
      <div
        aria-hidden="true"
        className="mt-5 flex animate-loading-fade-in flex-col items-center gap-1"
        style={{ animationDelay: '0.15s' }}
      >
        <p className="font-heading text-base font-semibold tracking-wide text-foreground">
          Jakirul Islam Hakim
        </p>
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Full Stack Developer
        </p>
      </div>

      {/* Bottom progress bar */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden bg-border/40"
      >
        <div className="h-full animate-loading-bar rounded-full bg-linear-to-r from-primary via-chart-2 to-primary" />
      </div>
    </div>
  );
}
