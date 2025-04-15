import { join } from 'node:path';
import process from 'node:process';

import federationPlugin from '@originjs/vite-plugin-federation';
import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

const cwd = process.cwd();

export default defineConfig({
  resolve: {
    alias: {
      '@ui/helpers': join(cwd, './src/helpers'),
      '@ui/components': join(cwd, './src/components'),
      '@ui/providers': join(cwd, './src/providers'),
      '@ui/schemes': join(cwd, './src/schemes'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: ['src/keno/index.ts'],
    },
  },
  server: {
    cors: {
      origin: '*',
    },
    https: {
      key: './certs/localhost.key',
      cert: './certs/localhost.crt',
    },
  },
  plugins: [
    reactPlugin(),
    federationPlugin({
      name: 'keno-ui',
      filename: 'index.js',
      exposes: {
        './keno': './src/keno',
      },
      shared: ['react'],
    }),
    dtsPlugin({ outDir: './dist/types', rollupTypes: true }),
  ],
});
