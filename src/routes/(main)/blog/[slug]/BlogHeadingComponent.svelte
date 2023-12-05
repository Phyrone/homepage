<script lang="ts">
	export let component: any;

	let depth: number;
	$: depth = component.depth;
</script>

{#if depth === 1}
	<h1 class="text-2xl"><slot /></h1>
{:else if depth === 2}
	<h2 class="text-xl"><slot /></h2>
{:else if depth === 3}
	<h3 class="text-lg"><slot /></h3>
{:else if depth === 4}
	<h4 class="text-md"><slot /></h4>
{:else if depth === 5}
	<h5 class="text-sm"><slot /></h5>
{:else if depth === 6}
	<h6 class="text-xs"><slot /></h6>
{/if}
