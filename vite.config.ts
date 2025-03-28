import federationPlugin from '@originjs/vite-plugin-federation';
import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  server: {
    cors: {
      origin: '*',
    },
  },
  plugins: [
    reactPlugin({
      babel: { plugins: [['@babel/plugin-proposal-decorators', { loose: true, version: '2022-03' }]] },
    }),
    federationPlugin({
      name: 'keno-ui',
      filename: 'index.js',
      exposes: {
        './components': './src/components',
        './app': './src/App',
      },
      shared: ['react'],
    }),
    dtsPlugin({ entryRoot: 'src', rollupTypes: true }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
