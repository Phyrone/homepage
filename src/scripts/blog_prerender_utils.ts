import { type BDocument, markdown_to_bdoc } from '$scripts/BDocument';
import type { FetchFunction } from '$scripts/types';

type MarkdownImport = () => Promise<string>;
const blog_md_files: Record<string, MarkdownImport> = import.meta.glob('/blog/*.md', {
  import: 'default',
  query: {
    raw: '',
  },
  eager: false,
}) as Record<string, MarkdownImport>;

function extract_slug(file_path: string): string {
  return file_path.slice(6, -3);
}

type BlogMDDoc = {
  markdown: string;
  file_path: string;
};
const blog_documents: Map<string, Promise<BlogMDDoc>> = new Map(
  Object.entries(blog_md_files).map(([file_path, file]) => {
    return [
      extract_slug(file_path),
      file().then((markdown) => {
        return {
          markdown,
          file_path,
        } satisfies BlogMDDoc;
      }),
    ];
  }),
);

export function all_post_slugs(): string[] {
  return Array.from(blog_documents.keys());
}

export function load_blog_post(slug: string, fetch: FetchFunction): Promise<BDocument> | undefined {
  return blog_documents
    .get(slug)
    ?.then(({ markdown, file_path }) => markdown_to_bdoc(markdown, slug, file_path, fetch));
}
