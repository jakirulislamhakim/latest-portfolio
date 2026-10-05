import { HERO_CODE_SNIPPET } from '../constants';

export function HeroCodeCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border/80 bg-card/95 p-4 shadow-xl backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 md:p-5">
      {/* Terminal Title Bar */}
      <div className="mb-3.5 flex items-center gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-destructive/80" />
        <span className="size-2.5 rounded-full bg-chart-4/80" />
        <span className="size-2.5 rounded-full bg-chart-1/80" />
      </div>

      {/* Code snippet */}
      <pre className="font-mono text-xs leading-relaxed text-foreground md:text-sm">
        <code>
          <div>
            <span className="font-semibold text-destructive">const</span>{' '}
            <span className="font-medium text-chart-2">{HERO_CODE_SNIPPET.variableName}</span> ={' '}
            <span className="text-muted-foreground">{'{'}</span>
          </div>

          <div className="space-y-0.5 pl-4 md:pl-5">
            {HERO_CODE_SNIPPET.properties.map((prop) => (
              <div key={prop.key}>
                <span className="font-medium text-primary">{prop.key}</span>
                <span className="text-muted-foreground">: </span>
                <span className="text-chart-1">{prop.value}</span>
                <span className="text-muted-foreground">,</span>
              </div>
            ))}
          </div>

          <div>
            <span className="text-muted-foreground">{'}'}</span>;
          </div>
        </code>
      </pre>
    </div>
  );
}
