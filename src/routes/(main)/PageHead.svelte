<script lang="ts">
  import { Home, Search } from 'lucide-svelte';

  let scoll_pos: number;

  let transparent = true;
  $: transparent = scoll_pos > 2;
</script>

<svelte:window bind:scrollY={scoll_pos} />
<div class="sticky top-0 w-full bg-base-300 z-30"
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
  <nav class="max-w-screen-xl mx-auto transition-all navbar">
    <a class="btn mr-1" href="/">
      <Home />
    </a>
    <label class="flex-auto flex input input-bordered">
      <Search/>
      <input type="search" class="grow border-0" placeholder="Comming Soon" disabled>
    </label>
  </nav>
</div>

