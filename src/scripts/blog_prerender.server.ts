import { type BDocMetadata, type BDocument, markdown_to_bdoc } from '$scripts/BDocument';
import type { FetchFunction } from '$scripts/types';

type MarkdownImport = () => Promise<string>;
const blog_md_files: Record<string, MarkdownImport> = import.meta.glob('/blog/**/*.md', {
  import: 'default',
  query: {
    raw: '',
  },
  eager: false,
}) as Record<string, MarkdownImport>;
//TODO validate month and day ranges strictly
const blog_filename_regex = /^\/blog\/((\d{4})[-/]((\d{1,2})[-/](\d{1,2})[-/])?)?(\w*\/)*(\w+).md$/;

function extract_slug(file_path: string): string {
  return file_path.slice(6, -3);
}

type BlogPostIdentifier = {
  year: number;
  month: number;
  day: number;
  slug: string;
};

async function parse_blog_post(
  filename: string,
  markdown_import: MarkdownImport,
  fetch: FetchFunction,
): Promise<[BlogPostIdentifier, BDocument]> {
  const parsed_filename = blog_filename_regex.exec(filename);
  if (parsed_filename === null) {
    throw new Error(`Invalid filename: ${filename}`);
  }
  console.log('parsed_from_filename', parsed_filename);
  const [_entire_match, _date_part, year_str, _month_day_part, month_str, day_str, _filler, slug] =
    parsed_filename;

  let year: number | undefined = undefined;
  let month: number | undefined = undefined;
  let day: number | undefined = undefined;
  if (year_str) {
    year = parseInt(year_str);
    if (month_str && day_str) {
      month = parseInt(month_str);
      day = parseInt(day_str);
    }
  }
  const markdown = await markdown_import();
  const bdoc = await markdown_to_bdoc(markdown, slug, filename, fetch);

  let identifier: BlogPostIdentifier;
  if (bdoc.meta.date) {
    const explicit_date = new Date(bdoc.meta.date);
    identifier = {
      year: explicit_date.getFullYear(),
      month: explicit_date.getMonth() + 1,
      day: explicit_date.getDate(),
      slug: bdoc.meta.slug,
    };
  } else if (year && month && day) {
    identifier = {
      year: year,
      month: month,
      day: day,
      slug,
    };
  } else {
    const fallback_date: Date = new Date();
    identifier = {
      year: fallback_date.getUTCFullYear(),
      month: fallback_date.getUTCMonth() + 1,
      day: fallback_date.getUTCDay(),
      slug,
    };
  }

  return [identifier, bdoc];
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

export async function new_all_posts(
  fetch: FetchFunction,
): Promise<Map<BlogPostIdentifier, BDocument>> {
  const all_posts = await Promise.all(
    Object.entries(blog_md_files).map(([file_path, file]) =>
      parse_blog_post(file_path, file, fetch),
    ),
  );
  return new Map(all_posts);
}

export async function new_all_keys(fetch: FetchFunction): Promise<BlogPostIdentifier[]> {
  const all_posts = await new_all_posts(fetch);
  return Array.from(all_posts.keys());
}

export async function new_blog_post(
  key: BlogPostIdentifier,
  fetch: FetchFunction,
): Promise<BDocument | undefined> {
  //TODO (cache?)
  const all_posts = await new_all_posts(fetch);
  return all_posts.get(key);
}

export async function all_posts_overview(fetch: FetchFunction): Promise<Map<BlogPostIdentifier, BDocMetadata>> {
  const all_posts = await new_all_posts(fetch);
  return new Map(
    Array.from(all_posts.entries()).map(([key, value]) => {
      return [key, value.meta];
    }),
  );
}

export function load_blog_post(slug: string, fetch: FetchFunction): Promise<BDocument> | undefined {
  return blog_documents
    .get(slug)
    ?.then(({ markdown, file_path }) => markdown_to_bdoc(markdown, slug, file_path, fetch));
}
