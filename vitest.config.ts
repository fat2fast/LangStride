import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@langstride/learning': path.resolve(__dirname, './packages/learning/src'),
      '@langstride/content': path.resolve(__dirname, './packages/content/src'),
      '@': path.resolve(__dirname, './apps/web'),
    },
  },
});
