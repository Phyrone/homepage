import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
  return json({
    headers: request.headers,
  });
};
