import type { VFile } from 'vfile';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { extract_metadata_compiler } from '$scripts/parser_utils';

const blog_md_files = import.meta.glob('/blog/*.md', {
	import: 'default',
	query: {
		raw: ''
	}
});

export async function load_blog_content(slug: string) {
	//import supports async and auto refresh over readFileSync
	return (await blog_md_files['/blog/' + slug + '.md']()) as string;
	//return readFileSync('./blog/' + slug + '.md', 'utf-8');
}

export function all_post_slugs(): string[] {
	return Object.keys(blog_md_files);
}

export async function extract_metadata(markdown: string): Promise<any> {
	const vfile: VFile = await unified()
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		.use(remarkParse)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		.use(remarkFrontmatter, ['yaml'])
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		.use(remarkGfm)
		.use(extract_metadata_compiler)
		.process(markdown);

	return JSON.parse(vfile.value as string);
}
