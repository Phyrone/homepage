<script lang="ts">
  import type { PageData } from './$types';
  import BPostCard from './BPostCard.svelte';
  import type { BDocMetadata } from '$scripts/BDocument';

  export let data: PageData;
  let posts: [[number, number, number], string, BDocMetadata][];
  $: posts = data.posts;
</script>

<svelte:head>
  <title>Phyrone | Home</title>
</svelte:head>

<div
  class="mx-auto flex w-full max-w-screen-md flex-auto flex-row flex-wrap justify-center gap-2 px-2 py-3 sm:flex-col sm:flex-nowrap"
>
  {#each posts as post}
    <BPostCard pos={posts.indexOf(post)} date={post[0]} slug={post[1]} metadata={post[2]} />
  {/each}
</div>
