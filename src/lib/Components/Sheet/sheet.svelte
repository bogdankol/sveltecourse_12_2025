<script lang="ts">
	import { alphabetToNumber, cellToIndex, numberToAlphabet, type Cell } from './helpers'

	type IProps = {
		data: Cell[][]
	}

	let { data = $bindable() }: IProps = $props()

	let editedCell: string | null = $state(null)
	let selectedCell: string | null = $state(null)
	let selectedCellObject = $derived.by(() => {
		if (!selectedCell) return null
		const [rowIdx, colIdx] = selectedCell.split(',')
		return data[Number(rowIdx) - 1]?.[Number(colIdx) - 1]
	})

	let numRows = $derived(data.length > 10 ? data.length : 10)
	let numCols = $derived.by(() => {
		const largestRow = Math.max(...data.map(row => row.length))
		return largestRow > 10 ? largestRow : 10
	})

	function init(el: HTMLInputElement) {
		el.focus()
		el.select()
	}

	function setCell(
		rowIdx: number,
		colIdx: number,
		prop: 'value' | 'bgColor' | 'color',
		value: string
	) {
		if (data[rowIdx]) {
			if (data[rowIdx][colIdx]) {
				data[rowIdx][colIdx][prop] = value
			} else {
				data[rowIdx][colIdx] = { [prop]: value }
			}
		} else {
			data[rowIdx] = []
			data[rowIdx][colIdx] = { [prop]: value }
		}
	}

	function parseValue(value: string | undefined): string | number {
		if (!value) return ''
		if (value.startsWith('=')) {
			const funcName = value.split('(')[0].substring(1) // we determine SUM/MULTIPLY etc
			const whichCellsShouldBeCalculated = value
				.replace(`=${funcName}`, '')
				.replace(/[()]/g, '')
				.split(',') // SUM(D2, D5) - we determine that in brackets
			const vals = whichCellsShouldBeCalculated.map(cellNum => {
				// we get array of values from whichCellsShouldBeCalculated cells
				const cell = cellToIndex(cellNum)
				const val = data[cell.row - 1]?.[cell.col - 1]?.value
				if (val?.startsWith('=')) {
					// remember that we go through data that is in code and in code values could be =SUM(C1, C2)
					//  so we need to do the same function (recursion) for that such values. Explanation: cells with SUM(C!, C2) operations
					//  are
					//  doing some operations and show result of such operation. Without that part that function would go
					// only once for a row and show result if values are numbers, but in that part we tell code to execute same function
					//  if values are not numbers but the same operations. So it again goes in operation cells do operations and return result)
					return Number(parseValue(val))
				}
				return val ? Number(val) : 0
			})
			console.log({
				funcName,
				whichCellsShouldBeCalculated,
				vals,
			})
			return vals.reduce(
				(acc, el) => {
					if (funcName === 'SUM') return acc + el
					if (funcName === 'MULTIPLY') return acc * el
					return acc * el
				},
				funcName === 'MULTIPLY' ? 1 : 0
			)
		} else return value
	}
</script>

<table class="sheet">
	<tbody>
		{#each { length: numRows + 1 }, rowIdx}
			<tr>
				{#each { length: numCols + 1 }, colIdx}
					{@const cellData = data[rowIdx - 1]?.[colIdx - 1]}
					{@const currentCell = `${rowIdx}, ${colIdx}`}
					<svelte:element
						this={rowIdx === 0 || colIdx === 0 ? 'th' : 'td'}
						scope={rowIdx === 0 ? 'col' : colIdx === 0 ? 'row' : undefined}
						role="button"
						tabindex="0"
						onclick={() => {
							if (currentCell === selectedCell || rowIdx === 0 || colIdx === 0) return
							selectedCell = currentCell
							editedCell = null
						}}
						ondblclick={() => {
							if (rowIdx === 0 || colIdx === 0) return
							editedCell = currentCell
						}}
						class:selected={selectedCell === currentCell}
						style:background-color={cellData?.bgColor}
						style:color={cellData?.color}
					>
						{#if rowIdx === 0 && colIdx > 0}
							{numberToAlphabet(colIdx)}
						{/if}
						{#if rowIdx > 0 && colIdx === 0}
							{rowIdx}
						{/if}
						{#if rowIdx > 0 && colIdx > 0}
							{#if editedCell !== currentCell}
								{parseValue(cellData?.value)}
							{:else}
								<input
									use:init
									type="text"
									value={cellData?.value || ''}
									style:background-color={cellData?.bgColor}
									style:color={cellData?.color}
									oninput={e => {
										const value = e.currentTarget.value
										setCell(rowIdx - 1, colIdx - 1, 'value', value)
									}}
									onkeydown={e => {
										if (e.key === 'Enter') editedCell = null
									}}
								/>
							{/if}
						{/if}
					</svelte:element>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

{#if selectedCell}
	<br />
	<label for="bgColor">Background</label>
	<input
		type="color"
		id="bgColor"
		value={selectedCellObject?.bgColor || '#222222'}
		oninput={e => {
      if(!selectedCell) return
			const [rowIdx, colIdx] = selectedCell?.split(',')
			setCell(Number(rowIdx) - 1, Number(colIdx) - 1, 'bgColor', e.currentTarget.value)
		}}
	/>
	<br />
	<br />
{/if}

{#if selectedCell}
	<br />
	<label for="color">Background</label>
	<input
		type="color"
		id="color"
		value={selectedCellObject?.bgColor || '#ffffff'}
		oninput={e => {
      if(!selectedCell) return
			const [rowIdx, colIdx] = selectedCell?.split(',')
			setCell(Number(rowIdx) - 1, Number(colIdx) - 1, 'color', e.currentTarget.value)
		}}
	/>
	<br />
	<br />
{/if}

<style lang="scss">
	.sheet {
		border-collapse: collapse;
		font-family: sans-serif;
		* {
			box-sizing: border-box;
		}
		tr {
			th {
				background-color: #191919;
			}
			td {
				background-color: #222;
			}
			td.selected {
				outline: 2px solid #3257f8;
				outline-offset: -2px;
			}
			th,
			td {
				width: 120px;
				height: 30px;
				border: 1px solid #393939;
				span {
					padding: 5px;
					display: inline-block;
				}
				input {
					width: 100%;
					height: 100%;
					padding: 5px;
					margin: 0;
					border: none;
					font-size: 16px;
					background-color: #222;
					color: #fff;
				}
			}
		}
	}
</style>
