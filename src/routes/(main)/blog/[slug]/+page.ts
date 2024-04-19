import type { PageLoad } from './$types';
import type { BDocument } from '$scripts/BDocument';
import { error } from '@sveltejs/kit';
import read_bin from '$scripts/read_bin';
import { DATA_BASE_URL } from '$scripts/consts';

export const trailingSlash = 'never';

export const load: PageLoad | undefined = async ({ params: { slug }, fetch }) => {
  try {
    const blog_post = await fetch(`${DATA_BASE_URL}/post/${slug}.bdoc`, {})
      .then((r) => (r.ok ? r : Promise.reject(r)))
      .then((r) => r.arrayBuffer())
      .then((r) => new Uint8Array(r))
      .then((r) => read_bin(r) as BDocument);
    //.then((r) => decode(r, { codec: mp_codec }) as BDocument);

    return {
      ...blog_post,
    };
  } catch (e) {
    if (e instanceof Response) {
      error(e.status);
    } else {
      throw e;
    }
  }
};
