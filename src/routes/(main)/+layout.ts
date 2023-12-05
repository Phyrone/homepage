import type { LayoutLoad } from './$types';

export const prerender = true;
export const trailingSlash = 'ignore';

export const load: LayoutLoad = async ({ fetch }) => {
	const all: string[] = await fetch('/_data/blog/all-posts.json').then((r) => r.json());
	return {
		all_posts: all
	};
};
