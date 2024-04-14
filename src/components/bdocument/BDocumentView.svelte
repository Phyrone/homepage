<script lang="ts">

  import type { BDocument } from '$scripts/BDocument';
  import BDocumentChildrenView from '$components/bdocument/BDocumentChildrenView.svelte';

  export let document: BDocument;
</script>

<BDocumentChildrenView children={document.children}/>