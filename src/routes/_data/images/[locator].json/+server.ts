import type { RequestHandler } from './$types';
import { getImageData } from '$scripts/image_utils';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params: { locator } }) => {
  const file_data = getImageData(locator);
  if (file_data) return json(file_data);
  else error(404);
};
