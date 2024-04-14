<script lang="ts">
  import LazyImage from '$components/LazyImage.svelte';
  import type { BDocMetadata } from '$scripts/BDocument';

  export let post: BDocMetadata;
</script>

<a
  href={'/blog/' + post.slug}
  class="card
  overflow-hidden rounded-lg bg-base-300 transition-all
  lg:card-side
  hover:drop-shadow-2xl
"
>
  <span>
    {#if post.thumbnail && typeof post.thumbnail === 'object'}
      <LazyImage alt={post.slug + '-thumbnail'} img_data={post.thumbnail} />
    {/if}
  </span>

  <div class="card-body">
    <span>{post?.title}</span>
  </div>
</a>
