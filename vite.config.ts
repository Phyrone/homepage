import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { imagetools } from 'vite-imagetools';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    sveltekit(),
    imagetools({
      removeMetadata: true,
    }),
    visualizer(),
  ],
  test: {
    include: ['tests/**/*.{js,ts}'],
    exclude: ['tests/e2e/**'],
  },
});
