import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#common': path.resolve(__dirname, './src/common'),
      '#core': path.resolve(__dirname, './src/core'),
      '#pods': path.resolve(__dirname, './src/pods'),
      '#scenes': path.resolve(__dirname, './src/scenes'),
      '#layouts': path.resolve(__dirname, './src/layouts'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/thumbnails': 'http://localhost:3000',
    },
  },
});
