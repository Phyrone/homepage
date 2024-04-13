import type { VFile } from 'vfile';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { extract_metadata_compiler } from '$scripts/parser_utils';

const blog_md_files = import.meta.glob('/blog/*.md', {
  import: 'default',
  query: {
    raw: '',
  },
});

export async function load_blog_content(slug: string) {
  return (await blog_md_files['/blog/' + slug + '.md']()) as string;
}

export function all_post_slugs(): string[] {
  return Object.keys(blog_md_files).map((name) => name.substring(6, name.length - 3));
}

export async function extract_metadata(markdown: string): Promise<Record<string, unknown>> {
  const vfile: VFile = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(extract_metadata_compiler)
    .process(markdown);

  return JSON.parse(vfile.value as string);
}
