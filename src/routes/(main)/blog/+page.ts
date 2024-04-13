import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const all_post_slugs: string[] = await fetch('/_data/blog/all-posts.json').then((r) => r.json());
  const all_posts_tasks = all_post_slugs.map((slug) =>
    fetch(`/_data/blog/posts/${slug}.json`).then((r) =>
      r.json().then((json) => {
        return {
          slug,
          ...json,
        };
      }),
    ),
  );
  const all_posts = await Promise.all(all_posts_tasks);

  for (const post of all_posts) {
    if (post.metadata.thumbnail) {
      post.thumbnail = await fetch(`/_data/blog/media/images/${post.metadata.thumbnail}.json`).then(
        (r) => r.json(),
      );
    }
  }

  return {
    slugs: all_post_slugs,
    all_posts,
  };
};
