export type TTerminalLineKind = 'input' | 'output' | 'error' | 'system';

export type TTerminalLine = {
  id: string;
  kind: TTerminalLineKind;
  text: string;
};

export type TTerminalCommandResult = {
  lines?: readonly string[];
  kind?: Exclude<TTerminalLineKind, 'input'>;
  clear?: boolean;
  openUrl?: string;
  scrollToId?: string;
};

export type TTerminalCommandDef = {
  name: string;
  aliases?: readonly string[];
  description: string;
  usage?: string;
  run: (args: readonly string[]) => TTerminalCommandResult;
};

export type TTerminalGotoTarget = {
  id: string;
  label: string;
};

export type TTerminalChipCommand = {
  id: string;
  command: string;
  label: string;
};

export type TTerminalSocialLink = {
  id: string;
  name: string;
  href: string;
};
