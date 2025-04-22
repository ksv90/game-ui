import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export const config = defineConfig({
  plugins: [
    reactPlugin({
      babel: { plugins: [['@babel/plugin-proposal-decorators', { loose: true, version: '2022-03' }]] },
    }),
  ],
});
