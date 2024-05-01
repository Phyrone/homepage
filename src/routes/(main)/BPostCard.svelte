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

<a
  class="flex flex-grow-0 flex-col rounded-2xl shadow-md transition-all
hover:shadow-2xl sm:flex-row sm:rounded-md
"
  class:sm:flex-row-reverse={odd}
  href={href}
>
  {#if metadata.thumbnail}
    <div class="h-fit w-full sm:h-32 sm:w-fit">
      <LazyImage alt={slug + ' thumbnail'} img_data={metadata.thumbnail} />
    </div>
  {/if}
  <div class="z-10 flex-auto">
    <h1>{metadata.title}</h1>
  </div>
</a>
