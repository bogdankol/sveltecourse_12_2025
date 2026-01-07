<script lang="ts">
	import NotificationContent from '$lib/Components/NotificationContent.svelte'
	import { generateNotifications } from '$lib/utils/helpers'
	import { onMount } from 'svelte'

	// let notifications = $state<Array<{ // this includes deep reactivity (when you don't recreate state but use .push()/.pop() methods)
	// 	title: string
	// 	body: string
	// 	date: number
	// 	id: string
	// }> | null>(null) 

  let notifications = $state.raw<Array<{  // this doesn't 'include deep reactivity (.push()/.pop() method won't cause rerender, use new values only')
		title: string
		body: string
		date: number
		id: string
	}> | null>(null)
	let isLoading = $state(true)

	onMount(() => {
		notifications = generateNotifications()
		isLoading = false
	})

	function removeItemHandler(id: string) {
		if (!notifications || !notifications.length) return
		notifications = notifications.filter(el => el.id !== id)
	}
</script>

<ul>
	{#if isLoading}
		<p>Loading data...</p>
	{:else if notifications && notifications.length}
		{#each notifications as notification (notification.id)}
			<li>
				<NotificationContent
					{...{
						notification,
						onRemove: () => removeItemHandler(notification.id),
					}}
				/>
			</li>
		{/each}
	{:else}
		<p>No notifications</p>
	{/if}
</ul>

<style>
	:global {
		h2 {
			font-size: 30px;
			font-weight: 700;
		}
	}

	ul {
		list-style: none;
		padding: 10px;
		margin: 0;
		li {
			margin-bottom: 10px;
		}
	}
</style>
