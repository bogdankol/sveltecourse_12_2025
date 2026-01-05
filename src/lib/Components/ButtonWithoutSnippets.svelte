<script lang="ts">
	import { cn } from '$lib/utils/styles-utils'
	import type { Snippet } from 'svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'

	interface IProps extends HTMLButtonAttributes {
		leftIconSnippet?: Snippet<[boolean]>
		childrenQ: Snippet<[boolean]>
		rightIconSnippet?: Snippet
		size?: 'sm' | 'lg'
		shadow?: boolean
		disabled?: boolean
		bgColor?: string
		textColor?: string
		onLeftIconHover?: () => void
		onRightIconHover?: () => void
	}

	let {
		leftIconSnippet,
		childrenQ,
		rightIconSnippet,
		shadow = false,
		size = 'sm',
		disabled,
		bgColor,
		textColor,
		onLeftIconHover,
		onRightIconHover,
		...props
	}: IProps = $props()

	let btnRef: HTMLButtonElement // as htmlComponent
	let isLeftHovered: boolean = $state(false)

	const btnStyles = `flex justify-center items-center bg-[#ff3e00] text-white px-5 py-0 h-[45px] font-bold rounded-[5px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[linear-gradient(0deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.4)_100%)] active:bg-[linear-gradient(0deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_100%)] focus:scale-[1.1]  `

	$effect(() => {
    btnRef.focus()
		console.log({ btnRef })
	})

  export function focusFunc() {
    btnRef.focus()
  }

  export function getBtnRef() {
    return btnRef
  }
</script>

<!-- Pay attention that you can write styles in several approaches: class='' style:css-prop-name={value} -->
<!-- <button -->
<svelte:element this={'button'}
	bind:this={btnRef}
	class={cn(btnStyles, {
		'h-[45px]': size === 'sm',
		'h-[55px] text-xl': size === 'lg',
		'shadow-lg': shadow,
	})}
	style:background-color={bgColor}
	style:color={textColor}
	{...{
		disabled,
	}}
	{...props}
>
	{#if leftIconSnippet}
		<div
			role={'presentation'}
			class={'mr-2 [&_svg]:stroke-red-500'}
			onmouseenter={() => {
				isLeftHovered = true
				onLeftIconHover?.()
			}}
			onmouseleave={() => (isLeftHovered = false)}
		>
			{@render leftIconSnippet(isLeftHovered)}
		</div>
	{/if}

	{@render childrenQ(isLeftHovered)}

	{#if rightIconSnippet}
		<div class={'ml-2'}>
			{@render rightIconSnippet()}
		</div>
	{/if}
<!-- </svelte> -->
</svelte:element>
