<script lang="ts">
  import type { BDocument } from '$scripts/BDocument';
  import BDocumentChildrenView from '$components/bdocument/BDocumentAllChildsView.svelte';

  export let document: BDocument;
</script>

<BDocumentChildrenView children={document.children} />
