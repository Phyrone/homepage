import type { RequestHandler } from './$types';
import { extract_metadata, load_blog_content } from '$scripts/blog_prerender_utils';

import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params;
  try {
    const blog_content = await load_blog_content(slug);
    const metadata = await extract_metadata(blog_content);

    return new Response(
      JSON.stringify({
        metadata,
      }),
    );
  } catch (e) {
    console.error('parser error', e);
    error(500);
  }
};
