import type { RequestHandler } from './$types';
import { SitemapStream, streamToPromise } from 'sitemap';
import { decode } from 'msgpack-lite';
import { mp_codec } from '$scripts/utils';
import { all_post_slugs } from '$scripts/blog_prerender_utils';

export const prerender = true;
export const trailingSlash = 'never';

export const GET: RequestHandler = async () => {
  /*const slugs: string[] = await fetch('/api/posts.bdoc',)
    .then((res) => res.arrayBuffer())
    .then((buf) => new Uint8Array(buf))
    .then((arr) => decode(arr, { codec: mp_codec }));*/
  const slugs = all_post_slugs();

  const sitemap = new SitemapStream({
    hostname: 'https://www.phyrone.de/',
    lastmodDateOnly: false,
  });

  const date = new Date().toISOString();

  //TODO include images information
  sitemap.write({
    url: '/',
    priority: 1.0,
    changefreq: 'monthly',
    lastmod: date,
  });
  sitemap.write({
    url: '/blog/',
    priority: 1.0,
    changefreq: 'hourly',
    lastmod: date,
  });
  for (const slug of slugs) {
    //include media information
    sitemap.write({
      url: '/blog/' + slug + '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: date,
    });
  }

  sitemap.write({
    url: '/impressum/',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: date,
  });
  sitemap.write({
    url: '/privacy/',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: date,
  });
  sitemap.end();
  const sitemap_buffer = await streamToPromise(sitemap);

  return new Response(sitemap_buffer, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
