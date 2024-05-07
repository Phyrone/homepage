import type { RequestHandler } from './$types';
import { read_bin_response } from '$scripts/read_bin';
import type { BDocument } from '$scripts/BDocument';
import { DATA_BASE_URL } from '$scripts/consts';
import { bdoc_to_raw_preview_html } from '$scripts/bdoc-raw-html-render.server';

export const prerender = 'auto';
export const GET: RequestHandler = async ({ fetch, params: { year, day, month, slug } }) => {
  const doc = await read_bin_response<BDocument>(
    fetch(`${DATA_BASE_URL}/post/${year}/${month}/${day}/${slug}`),
  );
  const html = bdoc_to_raw_preview_html(doc);

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
};
