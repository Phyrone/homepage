import type { RequestHandler } from './$types';
import { getImageData } from '$scripts/image_utils';
import { error } from '@sveltejs/kit';
import { encode } from 'msgpack-lite';
import { blog_data_headers, mp_codec } from '$scripts/utils';

export const prerender = 'auto';

export const GET: RequestHandler = async ({ params: { locator } }) => {
  const file_data = getImageData(locator);
  if (file_data)
    return new Response(encode(file_data, { codec: mp_codec }), {
      headers: {
        ...blog_data_headers,
      },
    });
  else error(404);
};
