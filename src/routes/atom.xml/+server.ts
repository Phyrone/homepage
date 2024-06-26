import type { RequestHandler } from './$types';
import type { Feed } from 'feed';
import { create_feed } from '$scripts/feed_prerender.server';

export const prerender = true;
export const trailingSlash = 'never';

export const GET: RequestHandler = async ({ fetch }) => {
  const feed: Feed = await create_feed(fetch);

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml',
    },
  });
};
