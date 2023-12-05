import type { RequestHandler } from './$types';
import type { VFile } from 'vfile';
import { load_blog_content } from '$scripts/blog_prerender_utils';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import stringify from 'remark-stringify';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, params }) => {
	const { slug } = params;

	try {
		const blog_content = await load_blog_content(slug);
		return new Response(blog_content);
	} catch (e) {
		console.error('parser error', e);
		throw error(500);
	}
};
