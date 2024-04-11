import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { imagetools } from 'vite-imagetools';
export default defineConfig({
  plugins: [
    sveltekit(),
    imagetools({
      removeMetadata: true,
    }),
  ],
  test: {
    include: ['tests/**/*.{js,ts}'],
    exclude: ['tests/e2e/**'],
  },
});
