import type { RequestHandler } from './$types';
import { SitemapStream, streamToPromise } from 'sitemap';
import { DATA_BASE_URL } from '$scripts/consts';
import { read_bin_response } from '$scripts/read_bin';
import type { AllPostsOverview } from '$scripts/types';
import { date_tree_to_array } from '$scripts/utils';

export const prerender = true;
export const trailingSlash = 'never';

export const GET: RequestHandler = async ({ fetch }) => {
  const posts: AllPostsOverview = await read_bin_response<AllPostsOverview>(
    fetch(`${DATA_BASE_URL}/posts`),
  );

  const sitemap = new SitemapStream({
    hostname: 'https://www.phyrone.de/',
    lastmodDateOnly: false,
  });

  //TODO include images information
  sitemap.write({
    url: '/',
    priority: 1.0,
    changefreq: 'monthly',
  });
  sitemap.write({
    url: '/blog/',
    priority: 1.0,
    changefreq: 'hourly',
  });

  for (const [[year, month, day], slug] of date_tree_to_array(posts)) {
    const date = new Date(year, month - 1, day);
    //include media information
    sitemap.write({
      url: `${year}/${month}/${day}/${slug}`,
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: date,
    });
  }

  sitemap.write({
    url: '/impressum/',
    priority: 0.3,
    changefreq: 'yearly',
  });
  sitemap.write({
    url: '/datenschutz/',
    priority: 0.3,
    changefreq: 'yearly',
  });
  sitemap.end();
  const sitemap_buffer = await streamToPromise(sitemap);

  return new Response(sitemap_buffer, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
