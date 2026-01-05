<script lang="ts">
	// let arr = $state([1, 2, 3, 4])
	// let arrObj = $state([{ id: 1 }, { id: 2 }])
	// let object = $state({
	// 	firstName: 'Ali',
	// 	lastName: 'Alaa',
	// 	address: {
	// 		city: 'City',
	// 		street: 'Street',
	// 	},
	// })

	// console.log({ object, arr, arrObj })
	// $effect(() => {
	// 	console.log('object effect')
	// 	console.log(object)
	// })
	// $effect(() => {
	// 	console.log('object.firstName effect')
	// 	console.log(object.firstName)
	// })
	// $effect(() => {
	// 	console.log('object.address.city')
	// 	console.log(object.address.city)
	// })
	// $effect(() => {
	// 	console.log('array')
	// 	console.log(arr[0])
	// })
	// $effect(() => {
	// 	console.log('array.length')
	// 	console.log(arr.length)
	// })

  // $inspect({object}).with(console.info) // to trace changes in object (as Proxy so it tracks props too) - replacement of console.log

  // $effect(() => {
  //   $inspect.trace() // that gives a direct link to changed state and where to look in code and file
  //   console.log(object.firstName)
  //   console.log(object.address.city)
  // })


</script>

<!-- {@debug object, arr}   track object and arr changes and activates devtools debugger on every change,, leave empty to add all $states to it -->
<!-- <h2>{object.firstName}</h2> -->
<!-- <h2>{object.address.city}</h2> -->

<!-- <input bind:value={object.firstName} />
<input bind:value={object.address.city} />
<input bind:value={object.address.street} />
<p>{arr}</p>
<button
	onclick={() => {
		arr[1] = Math.random() * 10
	}}>Add to array</button
>

<button
	onclick={() => {
		console.log($state.snapshot(object))
	}}>Log Snapshot</button
> -->

<style>
	:global {
		h2 {
			font-size: 30px;
			font-weight: 700;
		}
	}
</style>
