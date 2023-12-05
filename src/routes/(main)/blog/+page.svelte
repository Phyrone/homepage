<script lang="ts">
	import type { PageData } from './$types';
	import BlogPostCard from './BlogPostCard.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Phyrone | Blog</title>
</svelte:head>

<div class="px-4 py-2">
	{#each data.all_posts as post}
		<BlogPostCard {post} />
	{/each}
</div>

<div class="w-screen"></div>
