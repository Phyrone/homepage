<script lang="ts">
  import PageHead from './PageHead.svelte';
  import SkipNavigationButton from './SkipNavigationButton.svelte';
  import Sidebar from './Sidebar.svelte';
</script>

<SkipNavigationButton />

<div class="z-0 mx-auto flex min-h-screen flex-col">
  <PageHead />
  <div class="flex-auto mx-auto transition-all px-5 sm:px-3 md:px-1 flex flex-col md:flex-row w-full max-w-screen-xl shadow-2xl gap-2">
    <main
      class="flex min-h-full w-full flex-auto flex-col overflow-hidden rounded-md "
      id="main-content"
    >
      <slot />
    </main>
    <Sidebar />
  </div>
</div>
