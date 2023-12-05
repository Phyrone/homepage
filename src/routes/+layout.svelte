<script lang="ts">
  import "$styles/main.scss";
  import { navigating } from "$app/stores";
  import Navigatingindicator from "./Navigatingindicator.svelte";

</script>

{#if $navigating}
  <Navigatingindicator/>
{/if}

<slot />


