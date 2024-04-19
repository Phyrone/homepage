<script lang="ts">
  import type { BDocumentNode } from '$scripts/BDocument';
  import BDocumentChildrenView from '$components/bdocument/BDocumentChildrenView.svelte';
  import BUnknownTypeView from '$components/bdocument/node/BUnknownTypeView.svelte';
  import BDocumentHeadingView from '$components/bdocument/node/BDocumentHeadingView.svelte';
  import LazyImage from '$components/LazyImage.svelte';
  import BDocumentCodeView from '$components/bdocument/node/BDocumentCodeView.svelte';
  import BMermaidView from '$components/bdocument/node/BMermaidView.svelte';

  export let node: BDocumentNode;
</script>

{#if node.type === 0x00}
  {node.value}
{:else if node.type === 0x01}
  <a href={node.href} class="link">
    <BDocumentChildrenView children={node.children} />
  </a>
{:else if node.type === 0x10}
  <p>
    <BDocumentChildrenView children={node.children} />
  </p>
{:else if node.type === 0x11}
  <BDocumentHeadingView node={node}>
    <BDocumentChildrenView children={node.children} />
  </BDocumentHeadingView>
{:else if node.type === 0x45}
  <div class="my-0.5 overflow-hidden rounded-2xl">
    {#if node.data}
      <LazyImage alt={node.alt ?? 'no image description'} img_data={node.data} />
    {:else}
      <img src={node.src} alt={node.alt ?? 'no image description'} />
    {/if}
  </div>
{:else if node.type === 0x50}
  <BDocumentCodeView node={node}>
    <BDocumentChildrenView children={node.children} />
  </BDocumentCodeView>
{:else if node.type === 0x51}
  <BMermaidView node={node} />
{:else if node.type === 0x7f}
  <!-- eslint-disable svelte/no-at-html-tags -->
  {@html node.html}
{:else}
  <BUnknownTypeView node={node}>
    <BDocumentChildrenView children={node.children} />
  </BUnknownTypeView>
{/if}
