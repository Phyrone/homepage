import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { load_blog_post } from '$scripts/blog_prerender_utils';
import { encode } from 'msgpack-lite';
import { blog_data_headers, mp_codec } from '$scripts/utils';

export const GET: RequestHandler = async ({ params: { slug }, fetch }) => {
  const post = load_blog_post(slug, fetch);
  if (post) {
    return new Response(encode((await post).meta, { codec: mp_codec }), {
      headers: {
        ...blog_data_headers,
      },
    });
  } else {
    error(404, 'Post not found');
  }
};
