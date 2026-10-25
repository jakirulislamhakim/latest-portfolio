import type {
  TTerminalChipCommand,
  TTerminalCommandDef,
  TTerminalGotoTarget,
  TTerminalSocialLink,
} from '../types';

export const TERMINAL_CONTENT = {
  heading: 'Try the terminal',
  intro: 'Type commands to explore this portfolio. Start with help.',
  windowTitle: 'hakim@portfolio:~',
  prompt: 'visitor@hakim:~$',
  inputAriaLabel: 'Terminal command input',
  outputAriaLabel: 'Terminal output',
  unknownCommand: 'Command not found. Type "help" to see available commands.',
  emptyCommand: 'Type a command, or try "help".',
  gotoMissingArg: 'Usage: goto <section>. Try "list" to see sections.',
  gotoUnknown: 'Unknown section. Try "list" to see available sections.',
  gotoSuccessPrefix: 'Scrolling to',
} as const;

export const TERMINAL_WELCOME_LINES = [
  "Welcome to Hakim's portfolio terminal.",
  'Type "help" to see available commands.',
] as const;

export const TERMINAL_BANNER_LINES = [
  '  _   _       _    _',
  ' | | | | __ _| | _(_)_ __ ___',
  " | |_| |/ _` | |/ / | '_ ` _ \\",
  ' |  _  | (_| |   <| | | | | | |',
  ' |_| |_|\\__,_|_|\\_\\_|_| |_| |_|',
  '',
  ' Full Stack Developer — MERN · TypeScript · Next.js',
] as const;

export const TERMINAL_WHOAMI = 'Jakirul Islam Hakim — Software Developer';

export const TERMINAL_ABOUT_LINES = [
  'I build reliable web apps with a clear structure and a careful interface.',
  'Full-stack developer focused on the MERN stack, TypeScript, and Next.js.',
  'Type "goto about" to read more on the page.',
] as const;

export const TERMINAL_SKILL_LINES = [
  'Languages: JavaScript, TypeScript, C/C++, HTML5, CSS3, SQL',
  'Frontend: React, Next.js, Tailwind CSS, shadcn/ui, Redux Toolkit',
  'Backend: Node.js, Express, MongoDB, PostgreSQL, Zod, JWT',
  'Tools: Git, pnpm, Vercel, Sentry, ESLint, Cursor',
  'Type "goto skills" to see the full toolkit.',
] as const;

export const TERMINAL_PROJECT_LINES = [
  'Featured projects are coming soon.',
  'Type "goto projects" to jump to that section.',
] as const;

export const TERMINAL_SOCIAL_LINKS = [
  {
    id: 'github',
    name: 'GitHub',
    href: 'https://github.com/jakirulislamhakim',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jakirulislamhakim/',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    href: 'https://www.facebook.com/jakirulIslamHakim1',
  },
  {
    id: 'email',
    name: 'Email',
    href: 'mailto:jakirulislamhakim@gmail.com',
  },
] as const satisfies readonly TTerminalSocialLink[];

export const GITHUB_PROFILE_URL = 'https://github.com/jakirulislamhakim';

export const TERMINAL_GOTO_TARGETS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'activity', label: 'GitHub activity' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const satisfies readonly TTerminalGotoTarget[];

export const TERMINAL_CHIP_COMMANDS = [
  { id: 'help', command: 'help', label: 'help' },
  { id: 'about', command: 'about', label: 'about' },
  { id: 'skills', command: 'skills', label: 'skills' },
  { id: 'projects', command: 'projects', label: 'projects' },
  { id: 'contact', command: 'contact', label: 'contact' },
  { id: 'clear', command: 'clear', label: 'clear' },
] as const satisfies readonly TTerminalChipCommand[];

function buildContactLines(): string[] {
  return [
    'Get in touch:',
    ...TERMINAL_SOCIAL_LINKS.map((link) => `  ${link.name}: ${link.href}`),
    'Type "goto contact" to jump to the contact section.',
  ];
}

function buildListLines(): string[] {
  return [
    'Site sections:',
    ...TERMINAL_GOTO_TARGETS.map((target) => `  ${target.id.padEnd(12)} ${target.label}`),
    '',
    'Jump with: goto <section>',
  ];
}

function buildHelpLines(commands: readonly TTerminalCommandDef[]): string[] {
  const lines = ['Available commands:', ''];

  for (const command of commands) {
    const aliasText =
      command.aliases && command.aliases.length > 0
        ? ` (aliases: ${command.aliases.join(', ')})`
        : '';
    const usage = command.usage ? ` — ${command.usage}` : '';
    lines.push(`  ${command.name.padEnd(10)}${command.description}${aliasText}${usage}`);
  }

  lines.push('', 'Tip: use Tab to autocomplete, ↑/↓ for history.');
  return lines;
}

function resolveGotoTarget(section: string): TTerminalGotoTarget | undefined {
  const normalized = section.toLowerCase();
  return TERMINAL_GOTO_TARGETS.find((target) => target.id === normalized);
}

export const TERMINAL_COMMANDS: readonly TTerminalCommandDef[] = [
  {
    name: 'help',
    description: 'List available commands',
    run: () => ({
      lines: buildHelpLines(TERMINAL_COMMANDS),
    }),
  },
  {
    name: 'list',
    aliases: ['ls'],
    description: 'List site sections',
    run: () => ({
      lines: buildListLines(),
    }),
  },
  {
    name: 'whoami',
    description: 'Show identity',
    run: () => ({
      lines: [TERMINAL_WHOAMI],
    }),
  },
  {
    name: 'about',
    description: 'Short about summary',
    run: () => ({
      lines: TERMINAL_ABOUT_LINES,
    }),
  },
  {
    name: 'skills',
    description: 'Show skill categories',
    run: () => ({
      lines: TERMINAL_SKILL_LINES,
    }),
  },
  {
    name: 'projects',
    description: 'List featured projects',
    run: () => ({
      lines: TERMINAL_PROJECT_LINES,
    }),
  },
  {
    name: 'contact',
    description: 'Show contact links',
    run: () => ({
      lines: buildContactLines(),
    }),
  },
  {
    name: 'github',
    description: 'Open GitHub profile',
    run: () => ({
      lines: [`Opening ${GITHUB_PROFILE_URL}`],
      openUrl: GITHUB_PROFILE_URL,
    }),
  },
  {
    name: 'goto',
    description: 'Scroll to a page section',
    usage: 'goto <section>',
    run: (args) => {
      const section = args[0];

      if (!section) {
        return {
          kind: 'error',
          lines: [TERMINAL_CONTENT.gotoMissingArg],
        };
      }

      const target = resolveGotoTarget(section);

      if (!target) {
        return {
          kind: 'error',
          lines: [TERMINAL_CONTENT.gotoUnknown],
        };
      }

      return {
        lines: [`${TERMINAL_CONTENT.gotoSuccessPrefix} #${target.id} (${target.label})…`],
        scrollToId: target.id,
      };
    },
  },
  {
    name: 'clear',
    description: 'Clear the terminal',
    run: () => ({
      clear: true,
    }),
  },
  {
    name: 'banner',
    description: 'Show the welcome banner',
    run: () => ({
      lines: TERMINAL_BANNER_LINES,
    }),
  },
] as const;

export function findTerminalCommand(name: string): TTerminalCommandDef | undefined {
  const normalized = name.toLowerCase();

  return TERMINAL_COMMANDS.find(
    (command) =>
      command.name === normalized ||
      (command.aliases !== undefined && command.aliases.some((alias) => alias === normalized))
  );
}

export function getTerminalCommandNames(): readonly string[] {
  const names = new Set<string>();

  for (const command of TERMINAL_COMMANDS) {
    names.add(command.name);
    if (command.aliases) {
      for (const alias of command.aliases) {
        names.add(alias);
      }
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b));
}
