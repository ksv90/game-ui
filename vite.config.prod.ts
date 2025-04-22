import federationPlugin from '@originjs/vite-plugin-federation';
import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export const config = defineConfig({
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
      name: 'game-ui',
      filename: 'index.js',
      exposes: {
        './keno': './src/keno',
      },
      shared: ['react'],
    }),
    dtsPlugin({ outDir: './dist/types', rollupTypes: true }),
  ],
});
