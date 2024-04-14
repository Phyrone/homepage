import type { PageLoad } from './$types';
import { decode } from 'msgpack-lite';
import { mp_codec } from '$scripts/utils';
import type { BDocMetadata } from '$scripts/BDocument';

export const trailingSlash = 'always';

export const load: PageLoad = async ({ fetch }) => {
  const all_post_slugs: string[] = await fetch('/api/posts.bdoc')
    .then((r) => r.arrayBuffer())
    .then((r) => new Uint8Array(r))
    .then((r) => decode(r, { codec: mp_codec }));

  const all_posts = await Promise.all(
    all_post_slugs.map((slug) =>
      fetch(`/api/post/${slug}.bmet`)
        .then((r) => r.arrayBuffer())
        .then((r) => new Uint8Array(r))
        .then((r) => decode(r, { codec: mp_codec }) as BDocMetadata),
    ),
  );

  return {
    all_posts,
  };
};
