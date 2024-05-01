<script lang="ts">
  import { Home, Search } from 'lucide-svelte';

  let scoll_pos: number;

  let transparent = true;
  $: transparent = scoll_pos > 2;
</script>

<svelte:window bind:scrollY={scoll_pos} />
<div
  class="sticky top-0 z-30 w-full bg-base-300"
  class:opacity-75={transparent}
  class:delay-1000={transparent}
  class:duration-500={transparent}
  class:hover:delay-0={transparent}
  class:hover:opacity-100={transparent}
  class:hover:duration-200={transparent}
  class:active:delay-0={transparent}
  class:active:opacity-100={transparent}
  class:active:duration-200={transparent}
>
  <nav class="navbar mx-auto max-w-screen-xl transition-all px-5 sm:px-3 md:px-1">
    <a class="btn mr-1" href="/">
      <Home/>
    </a>
    <label class="input input-bordered flex flex-auto max-w-full overflow-clip">
      <Search />
      <input type="search" class="grow border-0" placeholder="Comming Soon" disabled />
    </label>
  </nav>
</div>
