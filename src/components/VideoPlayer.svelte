<script lang="ts">

  import type { VideoSource } from "$scripts/types";
  import Plyr from "plyr";
  import type { Options as PlayerConfig } from "plyr";

  import StaticVideo from "$components/video_source/StaticVideo.svelte";
  import PlainVideo from "$components/video_source/PlainVideo.svelte";
  import { onDestroy } from "svelte";
  import HlsVideo from "$components/video_source/HlsVideo.svelte";


  export let source: VideoSource;

  let thumbnail_url: string;
  let resolutions: number[];
  let selected_resolution: number | undefined = undefined;

  let player_config: PlayerConfig;
  $: if (resolutions)
    player_config = {
      quality: {
        forced: resolutions.length > 0,
        default: -1,
        options: [-1, ...resolutions],
        onChange: change_resolution
      }
    };

  function change_resolution(new_quality: number) {
    if (new_quality == -1)
      selected_resolution = undefined;
    else
      selected_resolution = new_quality;
  }


  let video_element: HTMLVideoElement;
  let player: Plyr;

  $:{
    if (video_element) {
      player?.destroy();
      player = new Plyr(video_element, {
        disableContextMenu: false
      });
    }
  }

  $:{
    console.log("config updated", player, "to", player_config);
  }


  $: console.log("res", selected_resolution, "of", resolutions);

  $: if (player) {
    player.quality;
  }

  onDestroy(() => {
    player?.destroy();
  });
</script>


{#if source}
  <div class="my-0.5 overflow-hidden rounded-2xl">
    {#if source.type === "static"}
      <StaticVideo {source} bind:thumbnail_url bind:video_element bind:resolutions bind:selected_resolution />
    {:else if source.type === "plain"}
      <PlainVideo {source} bind:video_element />
    {:else if source.type === "hls"}
      <HlsVideo {source} bind:video_element bind:resolutions bind:selected_resolution></HlsVideo>
    {/if}
  </div>
{/if}