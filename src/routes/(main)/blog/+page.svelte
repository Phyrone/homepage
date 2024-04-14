<script lang="ts">
  import type { PageData } from './$types';
  import BlogPostCard from './BlogPostCard.svelte';
  import { onMount } from 'svelte';

  export let data: PageData;

  onMount(() => {
    console.debug('page-data', data);
  });
</script>

<svelte:head>
  <title>Phyrone | Blog</title>
</svelte:head>

<div class="px-4 py-2">
  {#each data.all_posts as post}
    <BlogPostCard post={post} />
  {/each}
</div>

<div class="w-screen"></div>
