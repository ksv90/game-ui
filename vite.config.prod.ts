import federationPlugin from '@originjs/vite-plugin-federation';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
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
      input: ['src/mock/index.ts', 'src/keno/index.ts'],
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
    reactPlugin({
      babel: { plugins: [['@babel/plugin-proposal-decorators', { loose: true, version: '2022-03' }]] },
    }),
    vanillaExtractPlugin(),
    federationPlugin({
      name: 'game-ui',
      filename: 'index.js',
      exposes: {
        './mock': './src/mock',
        './keno': './src/keno',
      },
      shared: ['react'],
    }),
    dtsPlugin({
      outDir: './dist/types',
      rollupTypes: false,
      copyDtsFiles: true,
    }),
  ],
});
