<script lang="ts">
  import type { BDocMetadata } from '$scripts/BDocument';
  import LazyImage from '$components/LazyImage.svelte';

  export let pos: number;
  export let date: [number, number, number];
  export let slug: string;
  export let metadata: BDocMetadata;

  let href: string;
  $: href = `/${date[0]}/${date[1]}/${date[2]}/${slug}`;

  let odd: boolean;
  $: odd = pos % 2 == 1;
</script>

<a class="flex-grow-0 shadow-md hover:shadow-2xl transition-all rounded-2xl sm:rounded-md
flex flex-col sm:flex-row
"
   class:sm:flex-row-reverse={odd}
   href={href}>
  {#if metadata.thumbnail }
    <div class="sm:h-32 sm:w-fit h-fit w-full ">
      <LazyImage alt={slug+" thumbnail"} img_data={metadata.thumbnail} />
    </div>
  {/if}
  <div class="flex-auto z-10">
    <h1>{metadata.title}</h1>
  </div>
</a>
