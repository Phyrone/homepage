import type { RequestHandler } from './$types';
import { images } from '$scripts/blog_images';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
  const file_data = images[params.file];
  if (file_data) return new Response(JSON.stringify(file_data));
  else error(404);
};
