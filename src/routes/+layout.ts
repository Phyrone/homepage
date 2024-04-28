import type { LayoutLoad } from './$types';

export const prerender = true;
export const trailingSlash = 'ignore';

export const load: LayoutLoad = async () => {
  return {};
};
