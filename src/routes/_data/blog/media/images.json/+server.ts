import type { RequestHandler } from './$types';
import { images } from '$scripts/blog_images';

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify(images));
};
