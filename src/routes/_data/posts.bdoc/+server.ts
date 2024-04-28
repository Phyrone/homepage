import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { all_posts_overview } from '$scripts/blog_prerender.server';

export const GET: RequestHandler = async ({ fetch }) => {
  const overview = await all_posts_overview(fetch);


  return json({});
};
