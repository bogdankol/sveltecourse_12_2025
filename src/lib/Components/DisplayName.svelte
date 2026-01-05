<script lang="ts">
	let firstName = $state('Bohdan')
	let lastName = $state('Kol')
	let fullName = $derived(`${firstName} ${lastName}`)
	// let fullName = $derived.by(() => {
	// 	console.log('Fullname changed')
	// 	return `${firstName} ${lastName}`
	// })
	let username = $state('')

	let src = 'https://picsum.photos/250/300'
	let bio = `Hello, <b>this</b> is me.`

	$effect(() => {
		if (username || fullName) console.log('User has something')
	})
</script>

<!-- <label>
	Username
	<input class="border-[1px] border-b-black" bind:value={username} />
</label> -->

<label>
	First name
	<input
		class="border-[1px] border-b-black"
		bind:value={firstName}
		oninput={(e) => console.log({ e })}
	/>
</label>

<label>
	Last name
	<input class="border-[1px] border-b-black" bind:value={lastName} />
</label>

<button
	class="border hover:cursor-pointer p-2 flex justify-center items-center"
	onclick={() => console.log({ fullName })}>Get fullname</button
>

<img src={src} alt="some text" title="" />
<h1 class="text-red-500">{username || fullName}</h1>
<p>{@html bio}</p>
