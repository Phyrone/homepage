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

{#each posts as [date, slug, metadata]}
  <BPostCard slug={slug} date={date} metadata={metadata} />
{/each}
