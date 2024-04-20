<script lang="ts">
  import '$styles/app.pcss';
  import '$styles/main.scss';
  import { navigating } from '$app/stores';
  import Navigatingindicator from './Navigatingindicator.svelte';
  import { Toaster } from 'svelte-sonner';
  import { onMount } from 'svelte';
  import { init_tracker } from '$scripts/tracker';

  onMount(init_tracker);
</script>

{#if $navigating}
  <Navigatingindicator></Navigatingindicator>
{/if}
<Toaster position="bottom-right" richColors></Toaster>
<slot/>
