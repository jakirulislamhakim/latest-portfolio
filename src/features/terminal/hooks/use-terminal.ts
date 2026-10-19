'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import {
  findTerminalCommand,
  getTerminalCommandNames,
  TERMINAL_CONTENT,
  TERMINAL_WELCOME_LINES,
} from '../constants';
import type { TTerminalLine, TTerminalLineKind } from '../types';

type TUseTerminalResult = {
  lines: readonly TTerminalLine[];
  inputValue: string;
  setInputValue: (value: string) => void;
  runCommand: (rawCommand: string) => void;
  handleInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

function createWelcomeLines(idPrefix: string): TTerminalLine[] {
  return TERMINAL_WELCOME_LINES.map((text, index) => ({
    id: `${idPrefix}-welcome-${index}`,
    kind: 'system' as const,
    text,
  }));
}

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);

  if (!element) {
    return;
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openExternalUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function useTerminal(): TUseTerminalResult {
  const idPrefix = useId();
  const lineCounterRef = useRef(0);
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const draftInputRef = useRef('');

  const [lines, setLines] = useState<TTerminalLine[]>(() => createWelcomeLines(idPrefix));
  const [inputValue, setInputValue] = useState('');

  function createLine(kind: TTerminalLineKind, text: string): TTerminalLine {
    lineCounterRef.current += 1;
    return {
      id: `${idPrefix}-line-${lineCounterRef.current}`,
      kind,
      text,
    };
  }

  function appendLines(nextLines: readonly TTerminalLine[]) {
    setLines((previous) => [...previous, ...nextLines]);
  }

  function runCommand(rawCommand: string) {
    const trimmed = rawCommand.trim();

    if (trimmed.length > 0) {
      commandHistoryRef.current = [...commandHistoryRef.current, trimmed];
    }

    historyIndexRef.current = -1;
    draftInputRef.current = '';
    setInputValue('');

    if (trimmed.length === 0) {
      appendLines([createLine('input', TERMINAL_CONTENT.prompt)]);
      return;
    }

    const inputLine = createLine('input', `${TERMINAL_CONTENT.prompt} ${trimmed}`);
    const [commandName = '', ...args] = trimmed.split(/\s+/);
    const command = findTerminalCommand(commandName);

    if (!command) {
      appendLines([inputLine, createLine('error', TERMINAL_CONTENT.unknownCommand)]);
      return;
    }

    const result = command.run(args);

    if (result.clear) {
      setLines([]);
      return;
    }

    const resultKind = result.kind ?? 'output';
    const resultLines = (result.lines ?? []).map((text) => createLine(resultKind, text));

    appendLines([inputLine, ...resultLines]);

    if (result.openUrl) {
      openExternalUrl(result.openUrl);
    }

    if (result.scrollToId) {
      scrollToSection(result.scrollToId);
    }
  }

  function autocompleteCommand(currentValue: string) {
    const parts = currentValue.split(/\s+/);
    const isCompletingFirstToken = parts.length <= 1;
    const token = parts[0] ?? '';

    if (!isCompletingFirstToken || token.length === 0) {
      return;
    }

    const matches = getTerminalCommandNames().filter((name) =>
      name.startsWith(token.toLowerCase())
    );

    if (matches.length === 1) {
      setInputValue(matches[0] ?? '');
      return;
    }

    if (matches.length > 1) {
      appendLines([
        createLine('input', `${TERMINAL_CONTENT.prompt} ${currentValue}`),
        createLine('system', matches.join('  ')),
      ]);
    }
  }

  function handleHistoryNavigation(direction: 'up' | 'down') {
    const history = commandHistoryRef.current;

    if (history.length === 0) {
      return;
    }

    if (direction === 'up') {
      if (historyIndexRef.current === -1) {
        draftInputRef.current = inputValue;
        historyIndexRef.current = history.length - 1;
      } else if (historyIndexRef.current > 0) {
        historyIndexRef.current -= 1;
      }

      const entry = history[historyIndexRef.current];
      if (entry !== undefined) {
        setInputValue(entry);
      }
      return;
    }

    if (historyIndexRef.current === -1) {
      return;
    }

    if (historyIndexRef.current >= history.length - 1) {
      historyIndexRef.current = -1;
      setInputValue(draftInputRef.current);
      return;
    }

    historyIndexRef.current += 1;
    const entry = history[historyIndexRef.current];
    if (entry !== undefined) {
      setInputValue(entry);
    }
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      runCommand(inputValue);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      handleHistoryNavigation('up');
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      handleHistoryNavigation('down');
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      autocompleteCommand(inputValue);
    }
  }

  return {
    lines,
    inputValue,
    setInputValue,
    runCommand,
    handleInputKeyDown,
  };
}
