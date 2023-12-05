<script lang="ts">
  import PageHead from "$components/PageHead.svelte";
  import PageFoot from "$components/PageFoot.svelte";
  import SkipNavigationButton from "$components/SkipNavigationButton.svelte";
</script>


<SkipNavigationButton />

<div class="min-h-screen z-0 flex flex-col max-w-screen-xl mx-auto">
  <PageHead />

  <main class="flex-auto rounded-md mx-auto overflow-hidden w-full shadow-2xl flex flex-col" id="main-content">
    <slot />
  </main>
  <PageFoot />
</div>

<style lang="sass">

</style>