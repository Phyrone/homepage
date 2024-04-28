<script lang="ts">
  let scoll_pos: number;

  let transparent = true;
  $: transparent = scoll_pos > 2;
</script>

<svelte:window bind:scrollY={scoll_pos} />

<nav></nav>
