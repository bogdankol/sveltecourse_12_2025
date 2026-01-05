<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import '../app.css'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style lang="postcss">
	/* @reference "tailwindcss"; */
	:global {
		body {
			background-color: #368;
			font-family: 'Roboto', sans-serif;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	/* :global(body) {
      background-color: var(bg4);
    } */
</style>
