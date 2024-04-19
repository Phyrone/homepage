import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { load_blog_post } from '$scripts/blog_prerender_utils';

export const GET: RequestHandler = async ({ params: { slug }, fetch }) => {
  const post = load_blog_post(slug, fetch);
  if (post) {
    return json(await post);
  } else {
    error(404, 'Post not found');
  }
};
