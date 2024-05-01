import type { RequestHandler } from './$types';
import { all_posts_overview } from '$scripts/blog_prerender.server';
import write_bin from '$scripts/write_bin';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
  const overview = await all_posts_overview(fetch);
  const overview_bin = write_bin(overview);
  return new Response(overview_bin, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
};
