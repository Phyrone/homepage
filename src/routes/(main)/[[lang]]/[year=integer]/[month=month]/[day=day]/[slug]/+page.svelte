<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import BDocumentView from '$components/bdocument/BDocumentView.svelte';

  export let data: PageData;

  onMount(() => {
    console.debug('page-data', data);
  });
</script>

<svelte:head>
  <title>Phyrone | {data.meta.title ?? data.meta.slug}</title>
</svelte:head>
<BDocumentView document={data} />
