import type { RequestHandler } from './$types';
import { new_load_blog_post } from '$scripts/blog_prerender.server';
import { error } from '@sveltejs/kit';
import write_bin from '$scripts/write_bin';

export const GET: RequestHandler = async ({ params, params: { slug }, fetch }) => {
  const year = parseInt(params.year);
  const month = parseInt(params.month);
  const day = parseInt(params.day);
  const post = await new_load_blog_post({ day, year, month, slug }, fetch);
  if (post) {
    return new Response(write_bin(post), {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
  } else {
    error(418);
  }
};
