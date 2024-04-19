<script lang="ts">
  import '$styles/main.scss';
  import { navigating } from '$app/stores';
  import Navigatingindicator from './Navigatingindicator.svelte';
  import { Toaster } from 'svelte-sonner';
</script>

{#if $navigating}
  <Navigatingindicator />
{/if}
<Toaster position="bottom-right" richColors />
<slot />
