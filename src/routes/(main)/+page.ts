import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  await fetch('/_data/posts.bdoc').then((response) => response.json());

  return {};
};
