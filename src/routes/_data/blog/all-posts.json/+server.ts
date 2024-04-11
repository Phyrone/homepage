import type { RequestHandler } from './$types';
import { all_post_slugs } from '$scripts/blog_prerender_utils';

export const GET: RequestHandler = async () => {
  const posts = all_post_slugs();

  return new Response(JSON.stringify(posts));
};
