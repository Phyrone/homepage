import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
  return json({
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers),
  });
};
