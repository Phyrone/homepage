import type { RequestHandler } from './$types';
import { images } from '$scripts/blog_images';
import { error } from '@sveltejs/kit';
import { encode } from 'msgpack-lite';
import { mp_codec } from '$scripts/utils';

export const GET: RequestHandler = async ({ params }) => {
  const file_data = images[params.file];
  if (file_data) return new Response(encode(file_data, { codec: mp_codec }));
  else error(404);
};
