import react from '@vitejs/plugin-react';

import { resolve } from 'path';
import { defineConfig } from 'vite'

import checker from 'vite-plugin-checker';

export default defineConfig({
  base: '/',
  publicDir: 'public',
  cacheDir: 'node_modules/.vite',

  server: {
    port: 3002,
  },

  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks:{
          react: ['react', 'react-dom', 'react-router-dom'],
          formik: ['formik', 'yup'],
          axios: ['axios'],
          styledComponents: ['styled-components'],
          reactSelect: ['react-select'],
          reactToastify: ['react-toastify'],
          reactDropzone: ['react-dropzone'],
          reactPopover: ['react-tiny-popover'],
          reactSwitch: ['react-switch'],
          reactErrorBoundary: ['react-error-boundary'],
        }
      }
    },
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
      '@types': resolve(__dirname, './src/types/'),
      '@utils': resolve(__dirname, './src/utils/'),
    },
  },

  plugins: [
    react(),
    checker({
      typescript: {
        root: __dirname,
        tsconfigPath: './tsconfig.json',
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
});
