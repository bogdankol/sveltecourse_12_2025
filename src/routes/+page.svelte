<script lang="ts">
	import DisplayName from '$lib/Components/DisplayName.svelte'
	import RandomNumber from '$lib/Components/RandomNumber.svelte'
	import Counter from '$lib/Components/Counter.svelte'
	import ButtonWithSnippets from '$lib/Components/ButtonWithSnippets.svelte'
	import ButtonWithoutSnippets from '$lib/Components/ButtonWithoutSnippets.svelte'

	import { AlarmClockCheck, Search, AArrowDown } from 'lucide-svelte'

	let buttonPageRef: ButtonWithoutSnippets // as svelte component

	$effect(() => {
		console.log({ buttonPageRef, btnRefReceivedFromChild: buttonPageRef.getBtnRef() })
		// buttonPageRef.focusFunc() // here is works because we have function focusFunc() inside child
    buttonPageRef.getBtnRef().focus() // it works because getBtnRef returns html btn object that has focus() method
	})
</script>

<!-- <DisplayName /> -->
<!-- <RandomNumber /> -->
<!-- <Counter /> -->

<!-- first approach is to contain all snippets in ButtonWithSnippets -->
<!-- <ButtonWithSnippets leftIcon rightIcon>Text</ButtonWithSnippets> -->

<!-- second approach is to pass all snippets to ButtonWithoutSnippets and render them there as props and children -->
<div class="wrapper">
	<div
		role="presentation"
		onclick={() => {
			console.log('clicked div')
		}}
	>
		<ButtonWithoutSnippets
			bind:this={buttonPageRef}
			size="sm"
			shadow
			bgColor="#5DC9A8"
			textColor="#9457EB"
			onclick={e => {
				e.stopPropagation()
				console.log('clicked btn')
			}}
			onLeftIconHover={() => console.log('leftHovered')}
			onRightIconHover={() => console.log('leftHovered')}
		>
			{#snippet leftIconSnippet(isHovered: boolean)}
				{#if isHovered}
					<Search />
				{:else}
					<AArrowDown />
				{/if}
			{/snippet}
			{#snippet childrenQ(isLeftHovered: boolean)}
				{isLeftHovered}
			{/snippet}
			{#snippet rightIconSnippet()}
				<AlarmClockCheck />
			{/snippet}
		</ButtonWithoutSnippets>
	</div>
</div>

<style lang="postcss">
	.wrapper :global(button) {
		width: 250px;
	}
</style>
