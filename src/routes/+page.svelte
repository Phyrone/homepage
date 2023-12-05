<script lang="ts">
  import LandingCover from "./LandingCover.svelte";
  import PageFoot from "$components/PageFoot.svelte";
</script>

<svelte:head>
  <title>Phyrone | Home</title>
</svelte:head>

<div class="w-screen min-h-screen flex flex-col bg-base-300">
  <div
    class="drop-shadow-2xl max-w-screen-xl w-full bg-base-100 rounded-b-md rounded-t-none mx-auto px-4 py-2 flex align-middle join">
    <a class="flex-none mx-auto btn btn-ghost join-item" href="/">
      <i class="fa-solid fa-house fa-xl"></i>
    </a>
    <a class="flex-none mx-auto btn btn-ghost join-item" href="https://www.youtube.com/@phyrone" rel="external">
      <i class="fa-brands fa-youtube fa-xl"></i>
    </a>
    <a class="flex-auto mx-auto btn btn-ghost join-item" href="/blog/">Blog</a>
    <a class="flex-none mx-auto btn btn-ghost join-item" href="https://discord.gg/rb3qeBj4Fv" rel="external">
      <i class="fa-brands fa-discord fa-xl"></i>
    </a>
    <a class="flex-none mx-auto btn btn-ghost join-item" href="https://github.com/Phyrone" rel="external">
      <i class="fa-brands fa-github fa-xl"></i>
    </a>
  </div>

  <div class="grid place-items-center flex-auto mt-5 mb-0 mx-1 sm:mx-4 transition-all">
    <div
      class="relative max-w-screen-xl min-h-16 h-full w-full bg-base-100 p-0 rounded-md overflow-clip
      shadow-2xl"
    >
      <div class="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-clip z-0">
        <LandingCover />
      </div>
      <div class="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-clip z-10">
        <div class="bg-base-100 flex">
          <span class="mx-auto text-6xl font-extrabold select-none">Phyrone</span>
        </div>
        <div class="h-full" />
      </div>
    </div>
  </div>

  <div class="grid place-items-center">
    <div class="max-w-screen-xl w-full">
      <PageFoot />
    </div>

  </div>


</div>

