import type { ReactNode, RefObject } from 'react';
import { cn } from '@/lib/utils';
import { TERMINAL_CONTENT } from '../constants';
import type { TTerminalLine, TTerminalLineKind } from '../types';

type TTerminalOutputProps = {
  lines: readonly TTerminalLine[];
  outputRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

const LINE_KIND_CLASS: Record<TTerminalLineKind, string> = {
  input: 'text-foreground',
  output: 'text-muted-foreground',
  error: 'text-destructive',
  system: 'text-chart-2',
};

export function TerminalOutput({ lines, outputRef, children }: TTerminalOutputProps) {
  return (
    <div
      ref={outputRef}
      className="min-h-0 flex-1 overflow-y-auto font-mono text-xs leading-relaxed md:text-sm"
      aria-live="polite"
      aria-label={TERMINAL_CONTENT.outputAriaLabel}
      role="log"
    >
      <ul className="space-y-1">
        {lines.map((line) => (
          <li
            key={line.id}
            className={cn('break-words whitespace-pre-wrap', LINE_KIND_CLASS[line.kind])}
          >
            {line.text}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
