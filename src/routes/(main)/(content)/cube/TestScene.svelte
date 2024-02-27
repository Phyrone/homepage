<script lang="ts">
  import { T, useTask } from "@threlte/core";

  let OrbitControlsPromise = import("@threlte/extras").then((mod) => mod.OrbitControls);

  export let rotation = 0;
  export let rotate = false;
  export let controll = false;

  // useTask is relying on a context provided
  // by <Canvas>. Because we are definitely *inside*
  // <Canvas>, we can safely use it.
  useTask((delta) => {
    if (rotate) {
      rotation += delta;
    }
  });

</script>


<T.PerspectiveCamera
  makeDefault
  position={[2, 2, 2]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
>
  {#if controll}
    {#await OrbitControlsPromise}
      <!-- do nothing -->
    {:then OrbitControls}
      <OrbitControls />
    {/await}
  {/if}
</T.PerspectiveCamera>

<T.AmbientLight color={0xFFFFFF} intensity={1.2} />
<T.DirectionalLight position={[0, 10, 10]} castShadow />

<T.Mesh rotation.x={rotation} rotation.y={rotation} rotation.z={rotation}>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color={0x0E7277} />
</T.Mesh>
