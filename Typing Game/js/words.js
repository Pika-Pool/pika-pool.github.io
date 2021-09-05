const words = [
	'exclusive',
	'deranged',
	'trucks',
	'reaction',
	'spoon',
	'fantastic',
	'awful',
	'ray',
	'string',
	'day',
	'languid',
	'beneficial',
	'hurt',
	'drag',
	'alluring',
	'physical',
	'laborer',
	'key',
	'agreeable',
	'crowd',
	'hand',
	'moldy',
	'erratic',
	'risk',
	'cheese',
	'store',
	'ear',
	'fearless',
	'skinny',
	'dream',
	'selection',
	'long',
	'heartbreaking',
	'yawn',
	'call',
	'workable',
	'continue',
	'polite',
	'uneven',
	'cultured',
	'hesitant',
	'statement',
	'tasty',
	'stove',
	'elite',
	'women',
	'hill',
	'aunt',
	'humdrum',
	'rice',
];

const setOfWords = new Set();

export function randomWord() {
	if (setOfWords.size === words.length) return null;

	while (true) {
		const index = Math.floor(Math.random() * words.length);

		if (!setOfWords.has(words[index])) {
			setOfWords.add(words[index]);
			return words[index];
		}
	}
}
