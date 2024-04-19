import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { load_blog_post } from '$scripts/blog_prerender_utils';
import { blog_data_headers } from '$scripts/utils';
import write_bin from '$scripts/write_bin';

export const prerender = true;

export const GET: RequestHandler = async ({ params: { slug }, fetch }) => {
  const post = load_blog_post(slug, fetch);

  const encoded = write_bin(await post);
  if (post) {
    return new Response(encoded, {
      headers: {
        ...blog_data_headers,
      },
    });
  } else {
    error(404, 'Post not found');
  }
};
