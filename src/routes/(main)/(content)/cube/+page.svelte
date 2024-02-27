<script lang="ts">
  import TestScene from "./TestScene.svelte";
  import { Canvas } from "@threlte/core";


  let rotation: number = 0;
  let rotate: boolean = false;
  let controll: boolean = false;

  //when space is pressed, toggle rotation
  function handle_keypress(e: KeyboardEvent) {
    if (e.code === "Space" && !e.repeat && !pressed_keys.includes("KeyR")) {
      rotate = !rotate;
    } else if (e.code === "KeyR") {
      rotation = 0;
      rotate = false;
    } else if (e.code === "KeyC" && !e.repeat) {
      controll = !controll;
    }
  }


  let pressed_keys: string[] = [];

  function handle_key_down(e: KeyboardEvent) {
    if (!pressed_keys.includes(e.code)) {
      pressed_keys = [...pressed_keys, e.code];
    }
  }

  function handle_key_up(e: KeyboardEvent) {
    pressed_keys = pressed_keys.filter((key) => key !== e.code);
  }

</script>

<svelte:window
  on:keypress={handle_keypress}
  on:keydown={handle_key_down}
  on:keyup={handle_key_up}
/>
<svelte:head>
  <title>3D Cube Test</title>
</svelte:head>

<div class="flex-none flex flex-wrap">
  <div class="flex-auto">
    Rotate:
    <kbd
      class="kbd"
      class:bg-primary={rotate}
      class:bg-primary-content={rotate}
    >Space</kbd>
  </div>
  <div class="flex-auto">
    Enable Orbit Control:
    <kbd
      class="kbd"
      class:bg-primary={controll}
      class:bg-primary-content={controll}
    >C</kbd>
  </div>
  <div class="flex-auto">
    Reset Rotation:
    <kbd
      class="kbd"
      class:bg-primary={pressed_keys.includes("KeyR")}
      class:bg-primary-content={pressed_keys.includes("KeyR")}
    >R</kbd>
  </div>

</div>

<div class="flex-auto">
  {#key controll}
    <Canvas autoRender={true}>
      <TestScene bind:rotate bind:controll bind:rotation />
    </Canvas>
  {/key}
</div>

