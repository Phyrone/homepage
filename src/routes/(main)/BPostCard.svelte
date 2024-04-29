<script lang="ts">
  import type { BDocMetadata } from '$scripts/BDocument';

  export let date: [number, number, number];
  export let slug: string;
  export let metadata: BDocMetadata;

  let href: string;
  $: href = `/${date[0]}/${date[1]}/${date[2]}/${slug}`;
</script>

<a class="card" href={href}>
  <h1>{metadata.title}</h1>
</a>
