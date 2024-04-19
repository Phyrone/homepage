import type { RequestHandler } from './$types';
import { load_blog_post } from '$scripts/blog_prerender_utils';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params: { slug }, fetch }) => {
  const post = load_blog_post(slug, fetch);
  if (post) {
    return json((await post).meta);
  } else {
    error(404, 'Post not found');
  }
};
