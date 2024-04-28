import { remark } from 'remark';
import type { Code, Image, InlineCode, PhrasingContent, Root, RootContent } from 'mdast';
import jsYaml from 'js-yaml';
import highlight, { type HighlightResult } from 'highlight.js';
import type { FetchFunction, ImageData } from '$scripts/types';
import { getFileName } from '$scripts/images.server';
import { mp_codec } from '$scripts/utils';
import { decode } from 'msgpack-lite';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import remarkDirective from 'remark-directive';
import remarkHeadingId from 'remark-heading-id';
import { DATA_BASE_URL } from '$scripts/consts';
import moment from 'moment';

const md_parser = remark()
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkHeadingId, { defaults: true, uniqueDefaults: true })
  .use(remarkMath, { singleDollarTextMath: true })
  .use(remarkDirective)
  .use(remarkEmoji, { accessible: true, emoticon: false });

export async function markdown_to_bdoc(
  markdown: string,
  slug: string,
  doc_source: string,
  fetch: FetchFunction,
): Promise<BDocument> {
  const document: BDocument = {
    meta: {
      slug,
    },
    children: [],
  };
  const parsed = md_parser.parse(markdown);
  const processed = await md_parser.run(parsed);
  await ast_to_bdoc(document, processed, doc_source, fetch);
  await process_metadata(document, doc_source, fetch);

  return document;
}

async function process_metadata(
  document: BDocument,
  doc_source: string,
  fetch: FetchFunction,
): Promise<void> {
  const raw_metadata = document.meta as Record<string, unknown>;

  //thumbnail
  //  add variants for different sizes and formats
  {
    const thumbnail = raw_metadata.thumbnail;
    if (thumbnail && typeof thumbnail === 'string') {
      const file_name = getFileName(thumbnail, doc_source);
      document.meta.thumbnail = await fetch(`${DATA_BASE_URL}/images/${file_name}.bdoc`)
        .then((r) => r.arrayBuffer())
        .then((r) => new Uint8Array(r))
        .then((r) => decode(r, { codec: mp_codec }));
    }
  }
  //release date
  {
    try {
      const date = raw_metadata.date;
      if (date && typeof date === 'string') {
        document.meta.date = moment(date).toDate().toISOString();
      }
    } catch (e) {
      document.meta.date_invalid = document.meta.date;
      delete document.meta.date;
    }
  }
}

async function ast_to_bdoc(
  document: BDocument,
  root: Root,
  doc_source: string,
  fetch: FetchFunction,
): Promise<void> {
  document.children = await child_nodes_to_document(
    document,
    undefined,
    root.children,
    doc_source,
    fetch,
  );
}

async function child_nodes_to_document(
  document: BDocument,
  parent: RootContent | PhrasingContent | undefined,
  nodes: (RootContent | PhrasingContent)[],
  doc_source: string,
  fetch: FetchFunction,
) {
  return await Promise.all(
    nodes.map((node) => convert_content(document, parent, node, doc_source, fetch)),
  ).then((bdoc_nodes) => bdoc_nodes.filter((x) => x !== undefined) as BDocumentNode[]);
}

async function convert_content(
  document: BDocument,
  parent: RootContent | PhrasingContent | undefined,
  node: RootContent | PhrasingContent,
  doc_source: string,
  fetch: FetchFunction,
): Promise<BDocumentNode | undefined> {
  if (!node.type) return undefined;
  let result: BDocumentNode;
  switch (node.type) {
    case 'thematicBreak':
      return undefined;
    case 'code':
      result = read_code_block(document, parent, node, undefined);
      break;
    case 'inlineCode':
      result = read_code_block(document, parent, node, true);
      break;
    case 'image':
      return await read_image_data(document, parent, node, doc_source, fetch);
    case 'heading':
      return {
        type: 0x11,
        id: (node.data as { id: string })?.id,
        depth: node.depth,
        children: await child_nodes_to_document(document, node, node.children, doc_source, fetch),
      };
    case 'html':
      result = {
        type: 0x7f,
        html: node.value,
      };
      break;
    case 'paragraph':
      result = {
        type: 0x10,
        children: await child_nodes_to_document(document, node, node.children, doc_source, fetch),
      };
      break;
    case 'text':
      result = {
        type: 0x00,
        value: node.value,
      };
      break;
    case 'link':
      result = {
        type: 0x01,
        href: node.url,
        title: node.title ?? undefined,
        children: await child_nodes_to_document(document, node, node.children, doc_source, fetch),
      };
      break;
    case 'list':
      result = {
        type: 0x12,
        children: await child_nodes_to_document(document, node, node.children, doc_source, fetch),
      };
      break;
    case 'listItem':
      result = {
        type: 0x03,
        children: await child_nodes_to_document(document, node, node.children, doc_source, fetch),
      };
      break;
    case 'yaml':
      document.meta = Object.assign(document.meta, jsYaml.load(node.value));
      return undefined;
    default:
      return {
        type: -1,
        typename: node.type,
        data: node,
      };
  }
  /* POST PROCESSING */
  const hProperties = (node.data as { hProperties: Record<string, unknown> })?.hProperties;
  if (hProperties) {
    result.hProperties = hProperties;
  }
  return result;
}

function read_code_block(
  document: BDocument,
  parent: RootContent | PhrasingContent | undefined,
  node: Code | InlineCode,
  inline?: boolean,
): BDocumentNode {
  const lang: string | undefined = 'lang' in node ? node.lang ?? undefined : undefined;
  const code = node.value;
  if (lang === 'mermaid') {
    return {
      type: 0x51,
      diagram: code,
    };
  }

  let implicit = false;
  let formated: HighlightResult | undefined = undefined;
  if (lang) {
    try {
      formated = highlight.highlight(code, {
        language: lang,
      });
    } catch (_) {
      /* ignored */
    }
  }

  if (!formated) {
    formated = highlight.highlightAuto(code);
    implicit = true;
  }

  return {
    type: 0x50,
    language: lang ?? formated.language,
    formatted: formated.value,
    implicit: implicit ? true : undefined,
    inline,
    children: [],
  };
}

async function read_image_data(
  document: BDocument,
  parent: RootContent | PhrasingContent | undefined,
  node: Image,
  doc_source: string,
  fetch: FetchFunction,
): Promise<BDocumentNode | undefined> {
  const file_name = getFileName(node.url, doc_source);
  const image_data_url = `${DATA_BASE_URL}/images/${file_name}.bdoc`;
  const data: ImageData = await fetch(image_data_url)
    .then((r) => {
      if (r.ok) return r;
      else throw new Error('Failed to fetch image on ' + image_data_url);
    })
    .then((r) => r.arrayBuffer())
    .then((r) => new Uint8Array(r))
    .then((r) => decode(r, { codec: mp_codec }));

  return {
    type: 0x45,
    src: data.metadata.src,
    alt: node.alt ?? undefined,
    title: node.title ?? undefined,
    data,
  };
}

export type BDocMetadata = {
  slug: string;
  title?: string;
  thumbnail?: ImageData;
  description?: string;
  tags?: string[];
  date?: string;
} & Record<string, unknown>;

export type BDocument = {
  meta: BDocMetadata;
  children: BDocumentNode[];
};

export type BDocumentNode = {
  children?: BDocumentNode[];
  hProperties?: Record<string, unknown> | undefined;
} & NodeType;

export type NodeType =
  | TextNode
  | LinkNode
  | ParagraphNode
  | ListBlockNode
  | ListElementNode
  | HeadingNode
  | RawHtmlNode
  | ImageNode
  | CodeBlockNode
  | MermaidNode
  | UnknownType;

export type TextNode = {
  type: 0x00 /* text */;
  value: string;
};
export type LinkNode = {
  type: 0x01 /* link */;
  href: string;
  title?: string;
};

export type ListElementNode = {
  type: 0x03 /* list_element */;
};

export type ParagraphNode = {
  type: 0x10 /* paragraph */;
};

export type HeadingNode = {
  type: 0x11 /* heading */;
  id: string;
  depth: 1 | 2 | 3 | 4 | 5 | 6;
};
export type ListBlockNode = {
  type: 0x12 /* list_block */;
};

export type ImageNode = {
  type: 0x45 /* images */;
  src: string;
  alt?: string;
  title?: string;
  data?: ImageData;
};
export type CodeBlockNode = {
  type: 0x50 /* code_block */;
  language?: string;
  implicit?: boolean;
  inline?: boolean;
  formatted: string /* formatted html */;
};
export type MermaidNode = {
  type: 0x51 /* mermaid */;
  diagram: string;
};

export type RawHtmlNode = {
  type: 0x7f /* raw_html */;
  html: string;
};
export type UnknownType = {
  type: -1;
  typename: string;
  data: unknown;
};
