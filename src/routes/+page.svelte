<script lang="ts">
	import LandingCover from './LandingCover.svelte';
	import PageFoot from '$components/PageFoot.svelte';
	import PageHead from '$components/PageHead.svelte';
</script>

<svelte:head>
	<title>Phyrone | Home</title>
</svelte:head>

<div class="w-screen min-h-screen bg-base-300">
	<div class="max-w-screen-xl min-h-screen flex flex-col mx-auto">
		<PageHead />
		<div class="grid place-items-center flex-auto mt-5 mb-0 mx-1 sm:mx-4 transition-all">
			<div
				class="relative max-w-screen-xl min-h-16 h-full w-full bg-base-100 p-0 rounded-md overflow-clip
      shadow-2xl"
			>
				<div class="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-clip z-0">
					<LandingCover />
				</div>
				<div class="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-clip z-10">
					<div class="bg-base-100 flex">
						<span class="mx-auto text-6xl font-extrabold select-none">Phyrone</span>
					</div>
					<div class="h-full" />
				</div>
			</div>
		</div>

		<div class="max-w-screen-xl w-full">
			<PageFoot />
		</div>
	</div>
</div>
