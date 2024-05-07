<script lang="ts">
  import PageHead from './PageHead.svelte';
  import SkipNavigationButton from './SkipNavigationButton.svelte';
  import Sidebar from './Sidebar.svelte';
</script>

<SkipNavigationButton />

<div class="z-0 mx-auto flex min-h-screen flex-col">
  <PageHead />
  <div
    class="mx-auto flex w-full max-w-screen-xl flex-auto flex-col gap-2 px-5 shadow-2xl transition-all sm:px-3 md:flex-row md:px-1"
  >
    <main
      class="flex min-h-full w-full flex-auto flex-col overflow-hidden rounded-md"
      id="main-content"
    >
      <slot />
    </main>
    <Sidebar />
  </div>
</div>
