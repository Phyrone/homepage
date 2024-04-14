<script lang="ts">
  import 'highlight.js/scss/vs.scss';
  import type { CodeBlockNode } from '$scripts/BDocument';

  export let node: CodeBlockNode;
</script>
{#if node.inline}
  <code>
    <!-- eslint-disable svelte/no-at-html-tags -->
    {@html node.formatted}
  </code>
{:else}
  <div class="mockup-code px-2 my-0.5">
    <!-- eslint-disable svelte/no-at-html-tags -->
    {@html node.formatted}
  </div>
{/if}