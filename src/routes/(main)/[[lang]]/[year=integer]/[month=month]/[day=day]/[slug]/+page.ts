import type { PageLoad } from './$types';
import type { BDocument } from '$scripts/BDocument';
import { error } from '@sveltejs/kit';
import read_bin, { read_bin_response } from '$scripts/read_bin';
import { DATA_BASE_URL } from '$scripts/consts';
import { RequestError } from '$scripts/types';

export const trailingSlash = 'never';

export const load: PageLoad | undefined = async ({
  params: { lang, month, year, day, slug },
  fetch,
}) => {
  try {
    const blog_post = await read_bin_response<BDocument>(
      fetch(`${DATA_BASE_URL}/post/${year}/${month}/${day}/${slug}`, {
        cache: 'no-cache',
      }),
    );
    //.then((r) => decode(r, { codec: mp_codec }) as BDocument);

    return {
      ...blog_post,
      lang,
      year,
      day,
      slug,
    };
  } catch (e) {
    if (e instanceof RequestError) {
      error(e.response.status);
    } else {
      throw e;
    }
  }
};
