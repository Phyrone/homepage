import type { RequestHandler } from './$types';
import { createMermaidRenderer } from 'mermaid-isomorphic';
import base64url from 'base64url';
import { error } from '@sveltejs/kit';

export const prerender = true;

const renderer = createMermaidRenderer();

export const GET: RequestHandler = async ({ params: { data } }) => {
  const diagram = base64url.decode(data);

  const result1 = await renderer([diagram], {});
  const result2 = result1.pop();
  if (!result2) {
    error(404, 'not found');
  }
  if (result2.status === 'fulfilled') {
    return new Response(result2.value.svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  } else {
    error(400, 'rejected');
  }
};
