import federationPlugin from '@originjs/vite-plugin-federation';
import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: 'src/main.ts',
    },
  },
  server: {
    cors: {
      origin: '*',
    },
  },
  plugins: [
    reactPlugin(),
    federationPlugin({
      name: 'keno-ui',
      filename: 'index.js',
      exposes: {
        './components': './src/components',
        './app': './src/app',
      },
      shared: ['react'],
    }),
    dtsPlugin({ outDir: './dist/types', entryRoot: 'src' }),
  ],
});
