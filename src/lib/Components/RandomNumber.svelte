<script lang="ts">
	import { untrack, tick, onMount, onDestroy } from 'svelte'

	let randomNumber = $state(Math.floor(Math.random() * 10))
	let doubled = $derived(randomNumber * 2)
	let history: number[] = $state([untrack(() => randomNumber)]) // we ste initial value and tell for warning that the randomNumber is not a dependency

	let historyPTag: HTMLParagraphElement

	onMount(() => {
		console.log('mount')

		return () => {
			console.log('unmounted')
		}
	})

	onDestroy(() => {
		console.log('destroy')

		return () => {
			console.log('undestroyed')
		}
	})

	$effect.pre(() => {
		// runs before DOM changes
		history.length
		console.log('effect.pre', historyPTag?.innerText)
		tick().then(() => {
			// Returns a promise that resolves once any pending state changes have been applied.
			console.log('effect.pre -> tick', historyPTag?.innerText)
		})

		return () => console.log('effect.pre -> return')
	})

	$effect(() => {
		// microtasks, so is executed after dom updates
		//   // history.push(randomNumber) // this will cause infinite history update

		// randomNumber              // we inject dependency
		// untrack(() => history.push(randomNumber)) // we untrack history dependency, but if value is the same as previous it won't execute

		history.length // reactive, so methods that you can use by Proxy - also can be used because history value changed
		// console.log(history.map(el => el+10))
		console.log('effect', historyPTag?.innerText)
		tick().then(() => {
			console.log('effect -> tick', historyPTag?.innerText)
		})

		return () => console.log('effect -> return')
	})
</script>

<h2>The random number is: {randomNumber}</h2>
<h2>Doubled randomNumber is: {doubled}</h2>
<p bind:this={historyPTag}>History: {history}</p>

<button
	class="hover:cursor-pointer border-2 p-4 border-black"
	onclick={() => {
		randomNumber = Math.floor(Math.random() * 10)
		history.push(randomNumber)
		const h = $state.snapshot(history)
		console.log({
			randomNumber,
			doubled,
			h
		})
	}}>Generate</button
>
