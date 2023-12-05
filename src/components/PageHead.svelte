<script lang="ts">
  let scoll_pos: number;

  let transparent = true;
  $: transparent = scoll_pos > 2;


</script>

<svelte:window bind:scrollY={scoll_pos} />

<div
  class="navbar top-0 h-12 sticky w-full transition-all z-30 bg-base-300 rounded-b-md mb-4 shadow-2xl"
  class:duration-1000={transparent}
  class:bg-semi-transparent={transparent}
  class:backdrop-blur={transparent}
>
  <div class="navbar-start">

    <div class="join">
      <a class="btn border-0 btn-ghost join-item" class:text-white={transparent} href="/">
        <i class="fa-solid fa-house"></i> Home
      </a>
      <a class="btn border-0 btn-ghost join-item" class:text-white={transparent} href="/blog/">
        Blog
      </a>
    </div>

  </div>
  <div class="navbar-end">

  </div>

</div>

<style lang="sass">

  .bg-semi-transparent
    background: rgb(0 0 0/0.8)

</style>
