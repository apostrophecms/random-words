import seedrandom from "seedrandom";
import wordList from "./words/wordList.js";

const longestWord = wordList.reduce((wordA, wordB) =>
  wordA.length > wordB.length ? wordA : wordB
);

function words(options) {
  // initalize random number generator for words if options.seed is provided
  const random = options?.seed ? new seedrandom(options.seed) : null;
  const { minLength, maxLength, ...rest } = options || {};

  function word() {
    const min = minLength ?? 0;
    const max = maxLength ?? longestWord.length;
    let rightSize = false;
    let wordUsed;
    while (!rightSize) {
      wordUsed = generateRandomWord();
      rightSize = wordUsed.length <= max && wordUsed.length >= min;
    }
    return wordUsed;
  }

  function generateRandomWord() {
    return wordList[randInt(wordList.length)];
  }

  // random int as seeded by options.seed if applicable, or Math.random() otherwise
  function randInt(lessThan) {
    const r = random ? random() : Math.random();
    return Math.floor(r * lessThan);
  }

  // No arguments = generate one word
  if (typeof options === "undefined") {
    return word();
  }

  // Generate one word with limits
  if (minLength | maxLength && Object.keys(rest).length === 0) {
    return word();
  }
  // Just a number = return that many words
  if (typeof options === "number") {
    options = { exactly: options };
  }

  // options supported: exactly, min, max, join
  if (options.exactly) {
    options.min = options.exactly;
    options.max = options.exactly;
  }

  // not a number = one word par string
  if (typeof options.wordsPerString !== "number") {
    options.wordsPerString = 1;
  }

  //not a function = returns the raw word
  if (typeof options.formatter !== "function") {
    options.formatter = (word) => word;
  }

  //not a string = separator is a space
  if (typeof options.separator !== "string") {
    options.separator = " ";
  }

  const total = options.min + randInt(options.max + 1 - options.min);
  let results = [];
  let token = "";
  let relativeIndex = 0;

  for (let i = 0; i < total * options.wordsPerString; i++) {
    if (relativeIndex === options.wordsPerString - 1) {
      token += options.formatter(word(), relativeIndex);
    } else {
      token += options.formatter(word(), relativeIndex) + options.separator;
    }
    relativeIndex++;
    if ((i + 1) % options.wordsPerString === 0) {
      results.push(token);
      token = "";
      relativeIndex = 0;
    }
  }
  if (typeof options.join === "string") {
    results = results.join(options.join);
  }

  return results;
}

// Export the word list as it is often useful
export default words;
