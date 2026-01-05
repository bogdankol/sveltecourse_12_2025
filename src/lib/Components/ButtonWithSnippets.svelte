<script lang="ts">
	import type { Snippet } from 'svelte'
	import { Search, AlarmClockCheck, AArrowDown } from 'lucide-svelte'

	interface IProps {
		leftIcon?: boolean
		children: Snippet<[boolean]>
		rightIcon?: boolean
		size?: 'sm' | 'lg'
		shadow?: boolean
	}

	let { leftIcon, children, rightIcon, shadow = false, size = 'sm' }: IProps = $props()

	let isLeftHovered: boolean = $state(false)

	const btnStyles = `flex justify-center items-center bg-[#ff3e00] text-white px-5 py-0 h-[45px] font-bold rounded-[5px] cursor-pointer`
</script>

<button class={btnStyles}>
	{#if leftIcon}
		<div
			role={'presentation'}
			class={'left-content'}
			onmouseenter={() => (isLeftHovered = true)}
			onmouseleave={() => (isLeftHovered = false)}
		>
			{@render renderLeftIcon(isLeftHovered)}
		</div>
	{/if}

	{@render children(isLeftHovered)}

	{#if rightIcon}
		<div class="right-content">
			{@render renderRightIcon()}
		</div>
	{/if}
</button>

{#snippet renderLeftIcon(isHovered: boolean)}
	{#if isHovered}
		<Search />
	{:else}
		<AArrowDown />
	{/if}
{/snippet}

{#snippet renderRightIcon()}
	<AlarmClockCheck />
{/snippet}
