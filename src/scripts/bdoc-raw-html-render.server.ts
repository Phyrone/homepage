import type { BDocument, BDocumentNode, ImageNode } from '$scripts/BDocument';
import { rehype } from 'rehype';
import type { Root, Text, Element, Comment, ElementContent } from 'hast';
import type { Processor } from 'unified';

const rh: Processor<Root, undefined, undefined, Root, string> = rehype();

export function bdoc_to_raw_preview_html(bdoc: BDocument): string {
  const root: Root = {
    type: 'root',
    data: undefined,
    children: [
      {
        type: 'comment',
        value: 'this is a raw render of the document made for readers without javascript',
      } satisfies Comment,
      ...child_nodes_to_document(bdoc.children),
    ],
    position: undefined,
  };
  try {
    return rh.stringify(root, bdoc);
  } catch (e) {
    throw new ProcessError(root, e.message);
  }
}

class ProcessError extends Error {
  constructor(
    readonly root: Root,
    message: string,
  ) {
    super(message);
    this.root_json = JSON.stringify(root);
    this.name = 'ProcessError';
  }
}

export function child_nodes_to_document(nodes?: (BDocumentNode | undefined)[]): ElementContent {
  if (nodes)
    return nodes
      .filter((node) => node !== undefined)
      .map((node) => node_to_html_element(node))
      .filter((node) => node !== undefined) as ElementContent[];
  else return [];
}

export function node_to_html_element(node: BDocumentNode): ElementContent {
  switch (node.type) {
    case undefined:
      return {
        type: 'comment',
        value: 'undefined node',
      } satisfies Comment;
    case 0x00:
      if (node.hProperties) {
        return {
          type: 'element',
          tagName: 'span',
          properties: node.hProperties,
          children: [
            {
              type: 'text',
              value: node.value,
            } satisfies Text,
          ],
        } satisfies Element;
      }
      return {
        type: 'text',
        value: node.value,
      } satisfies Text;
    case 0x01:
      return {
        type: 'element',
        tagName: 'a',
        properties: {
          ...node.hProperties,
          href: node.href,
        },
        children: child_nodes_to_document(node.children),
      } satisfies Element;
    case 0x10:
      return {
        type: 'element',
        tagName: 'p',
        properties: node.hProperties,
        children: child_nodes_to_document(node.children),
      } satisfies Element;
    case 0x11:
      return {
        type: 'element',
        tagName: `h${node.depth}`,
        properties: {
          id: node.id,
          ...node.hProperties,
        },
        children: child_nodes_to_document(node.children),
      } satisfies Element;
    case 0x45:
      return image_node_to_html_element(node);
    case 0x50:
      return {
        type: 'element',
        tagName: 'code',
        properties: {
          class: 'hljs',
          ...node.hProperties,
        },
        children: rh.parse(node.formatted).children,
      } satisfies Element;

    default:
      return {
        type: 'comment',
        value: JSON.stringify(node),
      } satisfies Comment;
  }
}

function image_node_to_html_element(node: ImageNode): ElementContent {
  const data = node.data;
  if (!data) {
    return {
      type: 'comment',
      value: 'image node without data',
    } satisfies Comment;
  }

  const sources = data.srcsets.map((srcset) => {
    return {
      type: 'element',
      tagName: 'source',
      properties: {
        srcset: srcset.set,
        type: srcset.type,
      },
    } satisfies Element;
  });
  return {
    type: 'element',
    tagName: 'picture',
    properties: node.hProperties,
    children: [
      ...sources,
      {
        type: 'element',
        tagName: 'img',
        properties: {
          src: node.data?.metadata?.src,
        },
      } satisfies Element,
    ],
  } satisfies Element;
}
