<script lang="ts">
  import type { BDocumentNode } from '$scripts/BDocument';
  import BDocumentNodeView from '$components/bdocument/BDocumentNodeView.svelte';

  export let children: BDocumentNode[] = [];
</script>

{#each children as node}
  <BDocumentNodeView node={node} />
{/each}
