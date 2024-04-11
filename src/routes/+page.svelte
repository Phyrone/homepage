<script lang="ts">
  import LandingCover from './LandingCover.svelte';
  import PageFoot from '$components/PageFoot.svelte';
  import PageHead from '$components/PageHead.svelte';
</script>

<svelte:head>
  <title>Phyrone | Home</title>
</svelte:head>

<div class="min-h-screen w-screen bg-base-300">
  <div class="mx-auto flex min-h-screen max-w-screen-xl flex-col">
    <PageHead />
    <div class="mx-1 mb-0 mt-5 grid flex-auto place-items-center transition-all sm:mx-4">
      <div
        class="relative h-full min-h-16 w-full max-w-screen-xl overflow-clip rounded-md bg-base-100 p-0
      shadow-2xl"
      >
        <div class="absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full overflow-clip">
          <LandingCover />
        </div>
        <div class="absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full overflow-clip">
          <div class="flex bg-base-100">
            <span class="mx-auto select-none text-6xl font-extrabold">Phyrone</span>
          </div>
          <div class="h-full" />
        </div>
      </div>
    </div>

    <div class="w-full max-w-screen-xl">
      <PageFoot />
    </div>
  </div>
</div>
