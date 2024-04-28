import type { RequestHandler } from './$types';
import { all_post_slugs } from '$scripts/blog_prerender.server';
import { encode } from 'msgpack-lite';
import { mp_codec, blog_data_headers } from '$scripts/utils';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const posts = all_post_slugs();
  return new Response(encode(posts, { codec: mp_codec }), {
    headers: {
      ...blog_data_headers,
    },
  });
};
