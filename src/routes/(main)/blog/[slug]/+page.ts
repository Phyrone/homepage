import type { PageLoad } from './$types';
import type { BDocument } from '$scripts/BDocument';
import { mp_codec } from '$scripts/utils';
import { decode } from 'msgpack-lite';
import { error } from '@sveltejs/kit';

export const trailingSlash = 'always';

export const load: PageLoad | undefined = async ({ params: { slug }, fetch }) => {
  const blog_post_response = fetch(`/api/post/${slug}.bdoc`, {});
  const blog_post = blog_post_response
    .then((r) => r.arrayBuffer())
    .then((r) => new Uint8Array(r))
    .then((r) => decode(r, { codec: mp_codec }) as BDocument);

  const resolved_blog_post_response = await blog_post_response;
  if (!resolved_blog_post_response.ok) {
    error(resolved_blog_post_response.status, resolved_blog_post_response.statusText);
  } else {
    return {
      ...(await blog_post),
    };
  }
};
