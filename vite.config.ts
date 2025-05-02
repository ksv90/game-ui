import { join } from 'node:path';
import process from 'node:process';

import { defineConfig, UserConfig } from 'vite';

const cwd = process.cwd();

export default defineConfig(async ({ mode }) => {
  let config: UserConfig;

  if (mode === 'prod') {
    ({ config } = await import('./vite.config.prod'));
  } else {
    ({ config } = await import('./vite.config.dev'));
  }

  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        '@ui/components': join(cwd, './src/components'),
        '@ui/helpers': join(cwd, './src/helpers'),
        '@ui/mediators': join(cwd, './src/mediators'),
        '@ui/providers': join(cwd, './src/providers'),
        '@ui/schemes': join(cwd, './src/schemes'),
      },
    },
  };
});
