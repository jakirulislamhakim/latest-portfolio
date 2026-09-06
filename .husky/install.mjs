/* eslint-disable no-process-env, no-console */
// Skip Husky install in production and CI environments.
// This prevents failures when devDependencies are not installed.
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0);
}

const husky = (await import('husky')).default;
console.log(husky());
