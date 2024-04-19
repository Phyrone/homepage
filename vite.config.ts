import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig(async () => {
  return {
    plugins: [
      visualizer(),
      imagetools({
        removeMetadata: true,
      }),
      ...(await sveltekit()),
    ],
    test: {
      include: ['tests/**/*.{js,ts}'],
      exclude: ['tests/e2e/**'],
    },
  };
});
