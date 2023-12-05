import type { RequestHandler } from './$types';
import { SitemapStream, streamToPromise } from 'sitemap';

export const prerender = true;
export const trailingSlash = 'none';
export const GET: RequestHandler = async ({ fetch }) => {
	const all_posts: string[] = await fetch('_data/blog/all-posts.json').then((r) => r.json());
	const sitemap = new SitemapStream({
		hostname: 'https://www.phyrone.de/',
		lastmodDateOnly: false
	});

	const date = new Date().toISOString();

	//TODO include image information
	sitemap.write({
		url: '/',
		priority: 1.0,
		changefreq: 'monthly',
		lastmod: date
	});
	sitemap.write({
		url: '/blog/',
		priority: 1.0,
		changefreq: 'hourly',
		lastmod: date
	});
	for (const post of all_posts) {
		//include media information
		sitemap.write({
			url: '/blog/' + post,
			changefreq: 'weekly',
			priority: 1.0,
			lastmod: date
		});
	}

	sitemap.write({
		url: '/impressum/',
		priority: 0.3,
		changefreq: 'yearly',
		lastmod: date
	});
	sitemap.write({
		url: '/privacy/',
		priority: 0.3,
		changefreq: 'yearly',
		lastmod: date
	});
	sitemap.end();
	const sitemap_buffer = await streamToPromise(sitemap);

	return new Response(sitemap_buffer, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
