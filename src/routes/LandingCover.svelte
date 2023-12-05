<script lang="ts">
	import src_preview from '$assets/landing_cover.png?format=avif&w=128';
	import srcset_avif from '$assets/landing_cover.png?format=avif&w=16;32;64;128;256;512;1024&as=srcset';
	import srcset_webp from '$assets/landing_cover.png?format=webp&w=16;32;64;128;256;512;1024&as=srcset';
	import srcset_jpeg from '$assets/landing_cover.png?format=jpeg&w=16;32;64;128;256;512;1024&as=srcset';
	import src_png from '$assets/landing_cover.png?format=png&w=1024';
</script>

<svelte:head>
	<link rel="preload" href={src_preview} as="image" type="image/avif" />
	<link rel="preload" imagesrcset={srcset_avif} as="image" type="image/avif" />
</svelte:head>
<div class="h-full w-full relative">
	<img
		src={src_preview}
		alt="Landing Cover Preview"
		class="w-full h-full object-center object-cover blur overflow-hidden"
	/>
	<picture>
		<source srcset={srcset_avif} type="image/avif" />
		<source srcset={srcset_webp} type="image/webp" />
		<source srcset={srcset_jpeg} type="image/jpeg" />
		<img
			src={src_png}
			alt="Landing Cover"
			loading="lazy"
			class="absolute top-0 bottom-0 left-0 right-0 h-full w-full object-center object-cover"
		/>
	</picture>
</div>
