import type { RequestHandler } from './$types';
import { getImageData } from '$scripts/images.server';
import { error } from '@sveltejs/kit';
import { blog_data_headers } from '$scripts/utils';
import write_bin from '$scripts/write_bin';

export const prerender = 'auto';

export const GET: RequestHandler = async ({ params: { locator } }) => {
  const file_data = getImageData(locator);

  if (file_data)
    return new Response(write_bin(file_data), {
      headers: {
        ...blog_data_headers,
      },
    });
  else error(418);
};
