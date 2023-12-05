<script lang="ts">
	import BlogElement from './BlogElement.svelte';

	export let component: any;
</script>


<BlogElement {component}>
	{#if component.children}
		{#each component.children as child}
			<svelte:self component={child} />
		{/each}
	{/if}
</BlogElement>
