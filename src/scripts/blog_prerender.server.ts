import { type BDocument, markdown_to_bdoc } from '$scripts/BDocument';
import type { AllPosts, AllPostsOverview, BlogPostIdentifier, FetchFunction } from '$scripts/types';
import { set_date_tree_entry } from '$scripts/utils';

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

async function parse_blog_post(
  filename: string,
  markdown_import: MarkdownImport,
  fetch: FetchFunction,
): Promise<[BlogPostIdentifier, BDocument]> {
  const parsed_filename = blog_filename_regex.exec(filename);
  if (parsed_filename === null) {
    throw new Error(`Invalid filename: ${filename}`);
  }
  const [, , year_str, , month_str, day_str, , slug] = parsed_filename;
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

export async function new_all_posts(fetch: FetchFunction): Promise<AllPosts> {
  const all_posts = await Promise.all(
    Object.entries(blog_md_files).map(([file_path, file]) =>
      parse_blog_post(file_path, file, fetch),
    ),
  );
  const all_posts_struct: AllPosts = {};
  for (const [identifier, bdoc] of all_posts) {
    const { year, month, day, slug } = identifier;
    set_date_tree_entry(all_posts_struct, year, month, day, slug, bdoc);
  }
  return all_posts_struct;
}

export async function new_load_blog_post(
  key: BlogPostIdentifier,
  fetch: FetchFunction,
): Promise<BDocument | undefined> {
  //TODO (cache?)
  const all_posts = await new_all_posts(fetch);
  return all_posts[key.year]?.[key.month]?.[key.day]?.[key.slug];
}

export async function all_posts_overview(fetch: FetchFunction): Promise<AllPostsOverview> {
  const all_posts = await new_all_posts(fetch);
  const overview: AllPostsOverview = {};
  for (const [year, month_map] of Object.entries(all_posts)) {
    for (const [month, day_map] of Object.entries(month_map)) {
      for (const [day, slug_map] of Object.entries(day_map)) {
        for (const [slug, bdoc] of Object.entries(slug_map)) {
          set_date_tree_entry(
            overview,
            parseInt(year),
            parseInt(month),
            parseInt(day),
            slug,
            bdoc.meta,
          );
        }
      }
    }
  }
  return overview;
}
