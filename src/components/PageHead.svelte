<script lang="ts">
	let scoll_pos: number;

	let transparent = true;
	$: transparent = scoll_pos > 2;
</script>

<svelte:window bind:scrollY={scoll_pos} />

<div
	class="navbar top-0 h-12 sticky w-full transition-all z-30 bg-base-300 rounded-b-md mb-4 shadow-2xl"
	class:duration-1000={transparent}
	class:bg-semi-transparent={transparent}
	class:backdrop-blur={transparent}
>
	<div class="join w-full">
		<a class:nbb-sm={true} class:nbb={!transparent} class:nbb-transparent={transparent} href="/">
			<i class="fa-solid fa-house fa-xl"></i>
		</a>
		<a
			class:nbb-sm={true}
			class:nbb={!transparent}
			class:nbb-transparent={transparent}
			aria-label="Youtube Channel"
			href="https://www.youtube.com/@phyrone"
			rel="external"
		>
			<i class="fa-brands fa-youtube fa-xl"></i>
		</a>
		<a
			class:nbb-lg={true}
			class:nbb={!transparent}
			class:nbb-transparent={transparent}
			aria-label="Blog"
			href="/blog/">Blog</a
		>
		<a
			class:nbb-sm={true}
			class:nbb={!transparent}
			class:nbb-transparent={transparent}
			aria-label="Join Discord Server"
			href="https://discord.gg/rb3qeBj4Fv"
			rel="external"
		>
			<i class="fa-brands fa-discord fa-xl"></i>
		</a>
		<a
			class:nbb-sm={true}
			class:nbb={!transparent}
			class:nbb-transparent={transparent}
			aria-label="Github Profile"
			href="https://github.com/Phyrone"
			rel="external"
		>
			<i class="fa-brands fa-github fa-xl"></i>
		</a>
	</div>
</div>

<style lang="sass">
  .nbb-sm
    @apply flex-none
  .nbb-lg
    @apply flex-auto
  .nbb
    @apply btn btn-ghost join-item

  .nbb-transparent
    @apply text-white btn btn-ghost join-item

  .bg-semi-transparent
    background: rgba(0, 0, 0, 0.8)

</style>
