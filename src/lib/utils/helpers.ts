import { v4 } from 'uuid'
import { loremIpsum } from 'lorem-ipsum'

export function generateNotifications(length = 10) {
	return Array(length)
		.fill(null)
		.map((_, i) => {
			const date = new Date()
			date.setDate(date.getDate() + i)
			return {
				id: v4(),
				title: loremIpsum({ count: 1, sentenceLowerBound: 5, sentenceUpperBound: 10 }),
				body: loremIpsum({ count: 1, sentenceLowerBound: 20, sentenceUpperBound: 25 }),
				date: date.getTime(),
			}
		})
}
