<script lang="ts">

  import type { HeadingNode } from '$scripts/BDocument';

  export let node: HeadingNode;
</script>
{#if node.depth === 1}
  <h1 class="text-6xl">
    <slot />
  </h1>
{:else if node.depth === 2}
  <h2 class="text-5xl">
    <slot />
  </h2>
{:else if node.depth === 3}
  <h3 class="text-4xl">
    <slot />
  </h3>
{:else if node.depth === 4}
  <h4 class="text-3xl">
    <slot />
  </h4>
{:else if node.depth === 5}
  <h5 class="text-2xl">
    <slot />
  </h5>
{:else if node.depth === 6}
  <h6 class="text-xl">
    <slot />
  </h6>
{/if}