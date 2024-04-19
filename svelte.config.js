import adapter_static from '@sveltejs/adapter-static';
import adapter_cloudflare from '@sveltejs/adapter-cloudflare';
import adapter_bun from 'svelte-adapter-bun';
import adapter_deno from 'svelte-adapter-deno';
import adapter_node from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * @return Adapter
 */
function provide_adapter() {
  /**
   * @type {string|undefined}
   */
  let target = process.env.BUILD_TARGET;
  //only relevant for static adapter
  let precompress = process.env.BUILD_PRECOMPRESS === 'true';
  switch (target) {
    case undefined:
    case null:
    case 'static':
      return adapter_static({
        assets: 'build',
        pages: 'build',
        fallback: '404.html',
        precompress,
      });
    case 'cloudflare':
      return adapter_cloudflare({
        routes: {
          exclude: ['<all>', '/_data/*'],
        },
      });
    case 'bun':
      return adapter_bun({
        out: 'build',
        precompress: true,
        assets: true,
        dynamic_origin: false,
      });
    case 'node':
      return adapter_node({
        out: 'build',
        precompress: true,
      });
    case 'deno':
      return adapter_deno({
        out: 'build',
        precompress: true,
      });
    default:
      throw 'unknown target: ' + JSON.stringify(target);
  }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],
  ssr: {
    noExternal: ['three'],
  },
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: provide_adapter(),
    alias: {
      $components: './src/components',
      $styles: './src/styles',
      $scripts: './src/scripts',
      $assets: './src/assets',
      $blog: './blog',
    },
    prerender: {
      origin: 'https://www.phyrone.de',
      concurrency: 16,
      crawl: true,
    },
  },
};

export default config;
