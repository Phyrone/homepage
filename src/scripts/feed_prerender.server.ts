import type { AllPostsOverview, FetchFunction } from '$scripts/types';
import { Feed, type Item as FeedItem } from 'feed';
import { DATA_BASE_URL } from '$scripts/consts';
import type { BDocMetadata } from '$scripts/BDocument';
import { decode } from 'msgpack-lite';
import { date_tree_to_array, mp_codec } from '$scripts/utils';
import read_bin, { read_bin_response } from '$scripts/read_bin';
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

  const posts: AllPostsOverview = await read_bin_response<AllPostsOverview>(
    fetch(`${DATA_BASE_URL}/posts`),
  );

  const posts_array = date_tree_to_array<BDocMetadata>(posts);
  await Promise.all(
    posts_array.map(async ([[year, month, day], slug, metadata]) => {
      const date = new Date(year, month - 1, day);
      const local_link = `/${year}/${month}/${day}/${slug}`;
      const global_link = `https://www.phyrone.de${local_link}`;
      const item: FeedItem = {
        id: slug,
        title: metadata.title ?? `Post ${slug}`,
        link: global_link,
        //TODO determine date
        date,
      };
      const local_image_link = metadata.thumbnail?.metadata?.src;
      if (local_image_link) {
        const length = await fetch(local_image_link)
          .then((r) => r.arrayBuffer())
          .then((b) => b.byteLength);

        item.image = {
          url: `https://www.phyrone.de${local_image_link}`,
          length,
        };
      }
      feed.addItem(item);
    }),
  );

  return feed;
}
