import type { RequestHandler } from './$types';
import { all_post_slugs } from '$scripts/blog_prerender_utils';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const posts = all_post_slugs();

  return json(posts);
};
