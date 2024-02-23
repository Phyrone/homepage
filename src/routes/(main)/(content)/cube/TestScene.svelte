<script lang="ts">
	import { T, useTask } from '@threlte/core';

	let rotation = 0;
	// useTask is relying on a context provided
	// by <Canvas>. Because we are definitely *inside*
	// <Canvas>, we can safely use it.
	useTask((delta) => {
		rotation += delta;
	});
</script>

<T.Mesh rotation.y={rotation} rotation.x={rotation}>
	<T.BoxGeometry />
	<T.MeshBasicMaterial color="red" />
</T.Mesh>
