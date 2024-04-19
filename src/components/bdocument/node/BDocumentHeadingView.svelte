<script lang="ts">
  import type { HeadingNode } from '$scripts/BDocument';

  export let node: HeadingNode;
  let id: string;
  $: id = node.id;
</script>

{#if node.depth === 1}
  <h1 class="group text-6xl" id={id}>
    <slot />
    <a
      class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
      href="#{id}"
    >
      #</a
    >
  </h1>
{:else if node.depth === 2}
  <h2 class="group text-5xl" id={id}>
    <slot />
    <a
      class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
      href="#{id}"
    >
      #</a
    >
  </h2>
{:else if node.depth === 3}
  <h3 class="group text-4xl" id={id}>
    <slot />
    <a
      class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
      href="#{id}"
    >
      #</a
    >
  </h3>
{:else if node.depth === 4}
  <h4 class="group text-3xl" id={id}>
    <slot />
    <a
      class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
      href="#{id}"
    >
      #</a
    >
  </h4>
{:else if node.depth === 5}
  <h5 class="group text-2xl" id={id}>
    <slot />
    <a
      class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
      href="#{id}"
    >
      #</a
    >
  </h5>
{:else if node.depth === 6}
  <h6 class="group text-xl" id={id}>
    <slot />
    <a
      class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
      href="#{id}"
    >
      #</a
    >
  </h6>
{/if}
