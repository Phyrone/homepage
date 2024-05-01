import type { AllPostsOverview, FetchFunction } from '$scripts/types';
import { Feed, type Item as FeedItem } from 'feed';
import { DATA_BASE_URL } from '$scripts/consts';
import type { BDocMetadata } from '$scripts/BDocument';
import { date_tree_to_array } from '$scripts/utils';
import { read_bin_response } from '$scripts/read_bin';

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
      const content = await fetch(`${DATA_BASE_URL}/post${local_link}/raw.html`)
        .then((r) => r.text());
      const item: FeedItem = {
        id: slug,
        title: metadata.title ?? `Post ${slug}`,
        link: global_link,
        //TODO determine date
        date,
        content
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
