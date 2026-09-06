import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce subject is not empty
    'subject-empty': [2, 'never'],
    // Enforce type is not empty
    'type-empty': [2, 'never'],
    // Max line length for commit body
    'body-max-line-length': [2, 'always', 100],
    // Allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'hotfix', // Hotfix
        'docs', // Documentation only
        'style', // Formatting, no logic change
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf', // Performance improvement
        'test', // Adding missing tests
        'build', // Changes to build system or external dependencies
        'ci', // Changes to CI configuration files
        'chore', // Other changes that don't modify src or test files
        'revert', // Reverts a previous commit
      ],
    ],
  },
};

export default config;
