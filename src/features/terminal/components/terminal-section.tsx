import { SectionLayout } from '@/components/layout/section-layout';
import { TERMINAL_CONTENT } from '../constants';
import { Terminal } from './terminal';

export function TerminalSection() {
  return (
    <SectionLayout id="terminal" aria-labelledby="terminal-heading">
      <div className="text-center">
        <h2 id="terminal-heading">{TERMINAL_CONTENT.heading}</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {TERMINAL_CONTENT.intro}
        </p>
      </div>

      <div className="mt-8">
        <Terminal />
      </div>
    </SectionLayout>
  );
}
