<script lang="ts">
  import LazyImage from '$components/LazyImage.svelte';

  export let post: {
    slug: string;
    thumbnail: any;
    metadata?: {
      title?: string;
    };
  };
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
    {#if post.thumbnail}
      <LazyImage img_data={post.thumbnail} />
    {/if}
  </span>

  <div class="card-body">
    <span>{post?.metadata?.title}</span>
  </div>
</a>
