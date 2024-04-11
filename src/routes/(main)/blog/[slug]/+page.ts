import type { PageLoad } from './$types';
import { unified } from 'unified';
import { json_stringify } from '$scripts/parser_utils';
import type { VFile } from 'vfile';
import remak_parse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import jsYaml from 'js-yaml';

export const load: PageLoad = async ({ params, fetch }) => {
  const { slug } = params;

  const md = await (await fetch(`/_data/blog/posts/${slug}.md`)).text();
  const metadata = await (await fetch(`/_data/blog/posts/${slug}.json`))
    .json()
    .then((r) => r.metadata);
  const ast = await parse_markdown(md);
  return {
    slug,
    metadata,
    ast: await injected(ast, fetch),
  };
};

type FetchType = typeof fetch;

async function parse_markdown(markdown: string): Promise<string> {
  const vfile: VFile = await unified()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .use(remak_parse)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .use(remarkFrontmatter, ['yaml'])
    .use(json_stringify)
    .process(markdown);

  return vfile.value as string;
}

async function injected(ast: string, fetch: FetchType) {
  const parsed = JSON.parse(ast);
  await inject(parsed, fetch);

  return JSON.stringify(parsed);
}

async function inject(component: any, fetch: FetchType) {
  if (
    component.type === 'image' &&
    component.url !== undefined &&
    component.url.startsWith('_media/')
  ) {
    component['img_data'] = await fetch(
      `/_data/blog/media/images/${component.url.substring(7)}.json`,
    ).then((a) => a.json());
  } else if (
    component.type === 'code' &&
    component.lang === 'video' &&
    typeof component.value === 'string'
  ) {
    component['config'] = jsYaml.load(component.value);
    const thumbnail_name = component.config.thumbnail as string | undefined;
    if (thumbnail_name)
      component['thumbnail_data'] = await fetch(
        `/_data/blog/media/images/${thumbnail_name}.json`,
      ).then((a) => a.json());
  }
  if (component.children) {
    for (const child of component.children) {
      await inject(child, fetch);
    }
  }
}
