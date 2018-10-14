const wordList = require('./wordList.json');

function words(options) {
	function word() {
		if (options && options.maxLength > 1) {
			return generateWordWithMaxLength();
		} else {
			return generateRandomWord();
		}
	}

	function generateWordWithMaxLength() {
		let rightSize = false;
		let wordUsed;
		while (!rightSize) {
			wordUsed = generateRandomWord();
			if (wordUsed.length <= options.maxLength) {
				rightSize = true;
			}
		}
		return wordUsed;
	}

	function generateRandomWord() {
		return wordList[randInt(1, wordList.length)];
	}

	function randInt(min = 1, max = wordList.length) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	// No arguments = generate one word
	if (typeof options === 'undefined') {
		return word();
	}

	// Just a number = return that many words
	if (typeof options === 'number') {
		options = { exactly: options };
	}

	// options supported: exactly, min, max, join
	if (options.exactly) {
		options.min = options.min;
		options.max = options.exactly;
	}

	// not a number = one word par string
	if (typeof options.wordsPerString !== 'number') {
		options.wordsPerString = 1;
	}

	//not a function = returns the raw word
	if (typeof options.formatter !== 'function') {
		options.formatter = word => word;
	}

	//not a string = separator is a space
	if (typeof options.separator !== 'string') {
		options.separator = ' ';
	}

	options.min = options.min ? options.min : 1;
	options.max = options.max ? options.max : options.min;

	const total = options.min + randInt(options.min, options.max);
	const results = [];
	let token = '';
	let relativeIndex = 0;

	for (let i = 0; i < total * options.wordsPerString; i++) {
		if (relativeIndex === options.wordsPerString - 1) {
			token += options.formatter(word(), relativeIndex);
		} else {
			token += options.formatter(word(), relativeIndex) + options.separator;
		}
		relativeIndex++;

		//Validate if next String
		if ((i + 1) % options.wordsPerString === 0) {
			results.push(token);
			token = '';
			relativeIndex = 0;
		}
	}

	if (typeof options.join === 'string') {
		return results.join(options.join);
	}

	return results;
}

words.wordList = wordList;

module.exports = words;
