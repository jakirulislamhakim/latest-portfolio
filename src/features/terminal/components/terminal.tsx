'use client';

import { useEffect, useRef, type ChangeEvent, type MouseEvent } from 'react';
import { TERMINAL_CONTENT } from '../constants';
import { useTerminal } from '../hooks/use-terminal';
import { TerminalOutput } from './terminal-output';

export function Terminal() {
  const { lines, inputValue, setInputValue, handleInputKeyDown } = useTerminal();
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const outputElement = outputRef.current;

    if (!outputElement) {
      return;
    }

    outputElement.scrollTop = outputElement.scrollHeight;
  }, [lines]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function isScrollbarClick(event: MouseEvent<HTMLDivElement>) {
    const output = outputRef.current;

    if (!output) {
      return false;
    }

    const scrollbarWidth = output.offsetWidth - output.clientWidth;

    if (scrollbarWidth <= 0) {
      return false;
    }

    const bounds = output.getBoundingClientRect();
    return event.clientX >= bounds.right - scrollbarWidth;
  }

  function handleWindowMouseDown(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.closest('input, textarea, button, a')) {
      return;
    }

    if (isScrollbarClick(event)) {
      return;
    }

    // Keep the caret in the command field. Without this, the click focuses the page instead.
    event.preventDefault();
    inputRef.current?.focus();
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        className="flex h-[28rem] cursor-text flex-col rounded-2xl border border-border/80 bg-card/95 p-4 shadow-md backdrop-blur-md md:p-5"
        onMouseDown={handleWindowMouseDown}
      >
        <div className="mb-3.5 flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-destructive/80" />
          <span className="size-2.5 rounded-full bg-chart-4/80" />
          <span className="size-2.5 rounded-full bg-chart-1/80" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            {TERMINAL_CONTENT.windowTitle}
          </span>
        </div>

        <TerminalOutput lines={lines} outputRef={outputRef}>
          <div className="mt-1 flex min-h-11 items-center gap-2 md:min-h-9">
            <label htmlFor="terminal-command-input" className="sr-only">
              {TERMINAL_CONTENT.inputAriaLabel}
            </label>
            <span className="shrink-0 text-foreground" aria-hidden="true">
              {TERMINAL_CONTENT.prompt}
            </span>
            <input
              id="terminal-command-input"
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label={TERMINAL_CONTENT.inputAriaLabel}
              className="min-h-11 min-w-0 flex-1 bg-transparent text-foreground caret-primary outline-none focus-visible:ring-0 md:min-h-9"
            />
          </div>
        </TerminalOutput>
      </div>
    </div>
  );
}
