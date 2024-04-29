<script lang="ts">
  import PageHead from './PageHead.svelte';
  import SkipNavigationButton from './SkipNavigationButton.svelte';
  import Sidebar from './Sidebar.svelte';
</script>

<SkipNavigationButton />

<div class="z-0 mx-auto flex min-h-screen flex-col">
  <PageHead />
  <div class="mx-auto flex w-full max-w-screen-xl">
    <main
      class="flex min-h-full w-full flex-auto flex-col overflow-hidden rounded-md shadow-2xl"
      id="main-content"
    >
      <slot />
    </main>
    <Sidebar />
  </div>
</div>
