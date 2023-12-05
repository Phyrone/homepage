import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const posts_imports = import.meta.glob('/blog/*.md', {
		query: {
			raw: ''
		}
	});
	const posts = Object.keys(posts_imports).map((name) => name.substring(6, name.length - 3));

	return new Response(JSON.stringify(posts));
};
