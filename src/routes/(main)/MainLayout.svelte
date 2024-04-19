<script lang="ts">
  import PageHead from './PageHead.svelte';
  import PageFoot from './PageFoot.svelte';
  import SkipNavigationButton from './SkipNavigationButton.svelte';
</script>

<SkipNavigationButton />

<div class="z-0 mx-auto flex min-h-screen max-w-screen-xl flex-col">
  <PageHead />

  <main
    class="mx-auto flex min-h-full w-full flex-auto flex-col overflow-hidden rounded-md shadow-2xl"
    id="main-content"
  >
    <slot />
  </main>
  <PageFoot />
</div>

<style lang="sass">

</style>
