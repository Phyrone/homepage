import type { RequestHandler } from './$types';
import { load_blog_content } from '$scripts/blog_prerender_utils';
import type { VFile } from 'vfile';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePresetMinify from 'rehype-preset-minify';
import stringify from 'rehype-stringify';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;

	try {
		const blog_content = await load_blog_content(slug);
		const file: VFile = await unified()
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			.use(remarkParse)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			.use(remarkFrontmatter, ['yaml'])
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			.use(remarkGfm)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			.use(remarkRehype)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			.use(rehypePresetMinify)
			.use(stringify)

			.process(blog_content);

		//const parsed = md_parser.makeHtml(blog_content)

		return new Response(file.value);
	} catch (e) {
		console.error('parser error', e);
		throw error(500);
	}
};
