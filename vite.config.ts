import react from '@vitejs/plugin-react';

import { resolve } from 'path';

import { defineConfig, splitVendorChunkPlugin } from 'vite';

import checker from 'vite-plugin-checker';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: '/',
  publicDir: 'public',
  cacheDir: 'node_modules/.vite',

  server: {
    port: 3002,
  },

  define: {
    _APP_NAME: JSON.stringify(process.env.npm_package_name),
    _APP_VERSION: JSON.stringify(process.env.npm_package_version),
    _APP_BUILD_TIME: JSON.stringify(new Date().toISOString()),
  },

  build: {
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1000,
  },

  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets/'),
      '@components': resolve(__dirname, './src/components/'),
      '@contexts': resolve(__dirname, './src/contexts/'),
      '@hooks': resolve(__dirname, './src/hooks/'),
      '@screens': resolve(__dirname, './src/screens/'),
      '@services': resolve(__dirname, './src/services/'),
      '@styles': resolve(__dirname, './src/styles/'),
      '@customTypes': resolve(__dirname, './src/types/'),
      '@utils': resolve(__dirname, './src/utils/'),
    },
  },

  plugins: [
    react(),
    splitVendorChunkPlugin(), // auto‑splits vendor code into logical chunks
    checker({
      typescript: {
        root: __dirname,
        tsconfigPath: './tsconfig.json',
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
    createHtmlPlugin({
      inject: {
        data: {
          appName: process.env.npm_package_name,
          appVersion: process.env.npm_package_version,
          buildTime: new Date().toISOString(),
        },
      },
    }),
  ],
});
