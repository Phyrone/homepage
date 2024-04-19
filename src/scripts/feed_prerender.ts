import type { FetchFunction } from '$scripts/types';
import { Feed } from 'feed';
import { DATA_BASE_URL } from '$scripts/consts';
import type { BDocMetadata } from '$scripts/BDocument';
import { decode } from 'msgpack-lite';
import { mp_codec } from '$scripts/utils';
import read_bin from '$scripts/read_bin';
import type { ImageData } from '$scripts/types';

const last_updated = new Date();

export async function create_feed(fetch: FetchFunction): Promise<Feed> {
  const feed = new Feed({
    id: 'www.phyrone.de',
    title: 'Phyrones Blog',
    copyright: 'All rights reserved ' + last_updated.getUTCFullYear() + ', Phyrone',
    updated: last_updated,
    generator: 'https://github.com/jpmonette/feed',
    link: 'https://www.phyrone.de/blog/',
    author: {
      name: 'Phyrone',
      email: 'phyrone@phyrone.de',
      link: 'https://www.phyrone.de',
    },
  });

  const posts = await fetch(`${DATA_BASE_URL}/posts.bdoc`)
    .then((r) => r.arrayBuffer())
    .then((b) => new Uint8Array(b))
    .then((b) => decode(b, { codec: mp_codec }) as string[]);

  await Promise.all(
    posts.map(async (slug) => {
      const metadata = await fetch(`${DATA_BASE_URL}/post/${slug}.bmet`)
        .then((r) => r.arrayBuffer())
        .then((b) => new Uint8Array(b))
        .then((b) => read_bin(b) as BDocMetadata);
      const local_link = `/blog/${metadata.slug}`;
      const global_link = `https://www.phyrone.de${local_link}`;
      const content_html = await fetch(local_link).then((r) => r.text());

      let image_src: string | undefined = undefined;
      if (metadata.thumbnail) {
        image_src = `https://www.phyrone.de${(metadata.thumbnail as ImageData | undefined)?.metadata?.src}`;
      }
      feed.addItem({
        id: slug,
        title: metadata.title ?? `Post ${slug}`,
        image: image_src,
        link: global_link,
        //TODO determine date
        date: last_updated,
        content: content_html,
      });
    }),
  );

  return feed;
}
