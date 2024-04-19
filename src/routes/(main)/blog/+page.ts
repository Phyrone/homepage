import type { PageLoad } from './$types';
import { decode } from 'msgpack-lite';
import { mp_codec } from '$scripts/utils';
import type { BDocMetadata } from '$scripts/BDocument';
import read_bin from '$scripts/read_bin';
import { DATA_BASE_URL } from '$scripts/consts';
export const trailingSlash = 'always';

export const load: PageLoad = async ({ fetch }) => {
  const all_post_slugs: string[] = await fetch(`${DATA_BASE_URL}/posts.bdoc`)
    .then((r) => (r.ok ? r : Promise.reject(r)))
    .then((r) => r.arrayBuffer())
    .then((r) => new Uint8Array(r))
    .then((r) => decode(r, { codec: mp_codec }));

  const all_posts = await Promise.all(
    all_post_slugs.map(async (slug) => {
      const target_url = `${DATA_BASE_URL}/post/${slug}.bmet`;
      const r = await fetch(target_url);
      const r_1 = await r.arrayBuffer();
      const r_2 = new Uint8Array(r_1);
      return read_bin(r_2) as BDocMetadata;
    }),
  );

  return {
    all_posts,
  };
};
