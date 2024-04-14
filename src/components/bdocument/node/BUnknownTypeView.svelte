<script lang="ts">
  import { JsonView } from '@zerodevx/svelte-json-view';
  import type { BDocumentNode } from '$scripts/BDocument';

  export let node: BDocumentNode;
</script>

<JsonView json={node} depth={-1} />
