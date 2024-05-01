import type { PageLoad } from './$types';
import { read_bin_response } from '$scripts/read_bin';
import type { AllPostsOverview } from '$scripts/types';
import { date_tree_to_array } from '$scripts/utils';

export const load: PageLoad = async ({ fetch }) => {
  const posts = await read_bin_response<AllPostsOverview>(fetch('/_data/posts'));
  return {
    posts: date_tree_to_array(posts),
  };
};
