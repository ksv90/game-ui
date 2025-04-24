import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

const vitestConfig = defineConfig(async (env) => {
  const config = await viteConfig(env);
  return mergeConfig(config, {
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./vitest.setup.ts'],
    },
  });
});

export default vitestConfig;
