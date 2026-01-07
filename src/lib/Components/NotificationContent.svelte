<script lang="ts">
	import ButtonWithoutSnippets from './ButtonWithoutSnippets.svelte'

	interface IProps {
		notification: {
			title: string
			body: string
			date: number
			id: any
		}
		onRemove?: () => void
	}
	let { notification, onRemove }: IProps = $props()

  const { body, date, title, id } = notification // that will be executed once
	// const { body, date, title, id } = $derived(notification) // its calculated thus dependable on props - so yu can change them in code
	const dateStr = new Date(date).toDateString()
</script>

<div class="notification">
  <input bind:value={notification.title} />
	<h5 class="text-[16px]">{title}</h5>
	<p>{body}</p>
	<time class="text-blue-600 font-bold" datetime={dateStr}>{dateStr}</time>
	<div class="actions">
		<ButtonWithoutSnippets
			{...{
				onclick: () => onRemove?.(),
			}}>Remove</ButtonWithoutSnippets
		>
	</div>
</div>

<style lang="scss">
	.notification {
		border: 1px solid #3a3a3a;
		background-color: #1e1e1efa;
		padding: 15px;
		border-radius: 5px;
		font-family: Arial, Helvetica, sans-serif;

		.actions {
			display: flex;
			justify-content: flex-end;
		}

		h5 {
			margin: 0 0 10px;
			font-size: 20px;
		}

		p {
			margin: 0 0 10px;
		}
	}
</style>
