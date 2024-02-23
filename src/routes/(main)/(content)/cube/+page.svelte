<script lang="ts">
  import TestScene from "./TestScene.svelte";
  import { Canvas } from "@threlte/core";

  let width, height;

</script>
<div class="flex-auto"
     bind:clientWidth={width}
     bind:clientHeight={height}
>
  <Canvas autoRender={true}>
    <TestScene/>
  </Canvas>
</div>
