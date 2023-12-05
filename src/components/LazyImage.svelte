<script lang="ts">
	export let alt: string;
	export let img_data: {
		preview: string;
		preload_sets: number[];
		srcsets: {
			set: string;
			type: string;
		}[];
		metadata: {
			src: string;
		};
	};
	let src: string;
	$: src = img_data.metadata.src;

	let preload_sets: { set: string; type: string }[] = [];
	$: preload_sets = img_data.preload_sets.map((i) => img_data.srcsets[i]);
</script>

<svelte:head>
	<link rel="preload" as="image" href={img_data.preview} />
	{#each preload_sets as preload_set}
		<link rel="preload" as="image" imagesrcset={preload_set.set} type={preload_set.type} />
	{/each}
</svelte:head>

<div class="relative w-full h-full overflow-hidden">
	<img
		src={img_data.preview}
		alt={'preview' + (alt ?? 'no-description')}
		class="w-full h-full blur"
		width="100%"
		height="100%"
		loading="eager"
	/>
	<picture>
		{#each img_data.srcsets as set}
			<source srcset={set.set} type={set.type} />
		{/each}
		<img
			{src}
			alt={alt ?? 'no-description'}
			class="w-full h-full absolute top-0 bottom-0"
			width="100%"
			height="100%"
			loading="lazy"
		/>
	</picture>
</div>
