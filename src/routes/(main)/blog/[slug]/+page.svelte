<script lang="ts">
	import type { PageData } from './$types';
	import BlogContent from './BlogComponent.svelte';
	import { dev } from '$app/environment';

	export let data: PageData;
	$: console.debug('page data', data);

	let blog_content = JSON.parse(data.ast);
</script>

<svelte:head>
	<title>Phyrone | {data.slug}</title>
</svelte:head>

{#if dev}
	<div style="display: none">{data.ast}</div>
{/if}

<div class="bg-base-200 px-4 text-6xl shadow-md text-center select-none">
	{data.metadata?.title ?? 'No Title'}
</div>
<div class="px-4 pt-2 pb-8">
	<BlogContent component={blog_content} />
</div>
