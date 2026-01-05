<script lang="ts">
	const ORIGINAL_FREQUENCY = 1000
	let count = $state(0)
	let frequency = $state(ORIGINAL_FREQUENCY)
	let isPaused = $state(false)

	$effect(() => {
		let interval: ReturnType<typeof setInterval>

		if (!isPaused) {
			interval = setInterval(() => {
				count += 1 // inside setTimeout or setInterval it is not considered to be a dependency
			}, frequency)
		}

		return () => clearInterval(interval)
	})
</script>

<h1>{count}</h1>
{frequency}
<button
	onclick={() => {
		frequency *= 2
	}}>Slower</button
>
<button
	onclick={() => {
		frequency /= 2
	}}>Faster</button
>

<button
	onclick={() => {
		count = 0
		frequency = ORIGINAL_FREQUENCY
	}}>Reset</button
>

<button
	onclick={() => {
		isPaused = !isPaused
	}}>{isPaused ? 'Continue' : 'Pause'}</button
>
