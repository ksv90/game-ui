import { defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});

export default vitestConfig;
