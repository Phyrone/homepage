<script lang="ts">
	import MainLayout from './(main)/MainLayout.svelte';
	import { page } from '$app/stores';
</script>

<MainLayout>
	<h1>{$page.status}</h1>
	<h2>{$page.error.message}</h2>
</MainLayout>
