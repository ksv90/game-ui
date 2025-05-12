import { readFileSync } from 'node:fs';
import process from 'node:process';

import { createModuleFederationConfig, pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';

let httpsKey: string | undefined;
let httpsCert: string | undefined;

try {
  throw new Error(''); // TODO: добавить переменную для включения https
  httpsKey = readFileSync('./certs/localhost.key', 'utf-8');
  httpsCert = readFileSync('./certs/localhost.crt', 'utf-8');
} catch {
  process.stdout.write('https certificates not found\n');
}

const moduleFederationConfig = createModuleFederationConfig({
  name: 'gameUi',
  exposes: {
    './keno': './src/keno',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
  dts: {
    generateTypes: {
      compilerInstance: 'tspc', // ts-patch pack cli
    },
  },
});

export default defineConfig({
  plugins: [
    pluginReact({
      reactRefreshOptions: {
        exclude: [/\.css\.ts$/],
      },
    }),
    pluginModuleFederation(moduleFederationConfig),
  ],
  tools: {
    rspack: {
      plugins: [new VanillaExtractPlugin()],
    },
  },
  server: {
    port: 1111,
    https:
      httpsKey && httpsCert
        ? { key: httpsKey, cert: httpsCert }
        : // eslint-disable-next-line no-undefined
          undefined,
  },
});
