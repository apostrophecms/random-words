import assert from "node:assert";
import { generate, count, wordList } from "../index.js";

const customWordList = [
  "test",
  "testTest",
  "testTestTest",
  "testTestTestTest",
  "testTestTestTestTest",
  "testTestTestTestTestTest",
];

function getLongestWordLengthFromList (list) {
  return list.reduce(
    (longestWord, currentWord) =>
      currentWord.length > longestWord.length ? currentWord : longestWord
  ).length;
}

describe("random-words",  () => {
  describe("generate()", () => {
    describe("with the default word list", () => {
      it("should return one word when called with no arguments", () => {
        const word = generate();
        assert.ok(typeof word === "string", "word is a string");
        assert.ok(word.length, "word is not empty");
        assert.ok(word.indexOf(" ") === -1, "word does not contain spaces");
      });
      it("should return 1 word in array when called with the number 1", () => {
        const words = generate(1);
        assert.ok(words.length === 1, "contains 1 elements");
      });
      it("should return 5 words when called with the number 5", () => {
        const words = generate(5);
        assert.ok(words.length === 5, "contains 5 elements");
      });
      it("should return between 5 and 10 words when called with min: 5 and max: 10", () => {
        const words = generate({ min: 5, max: 10 });
        assert.ok(words.length >= 5 && words.length <= 10);
      });
      it("returns result of variable length when called with min: 5 and max: 10", () => {
        const lengths = {};
        for (let i = 0; i < 100; i++) {
          const words = generate({ min: 5, max: 10 });
          lengths[words.length] = true;
        }
        assert.ok(Object.keys(lengths).length > 1, "result varies in length");
      });
      it("should return 5 space separated words when join is used with exactly: 5", () => {
        let phrase = generate({ exactly: 5, join: " " });
        assert.ok(typeof phrase === "string", "result is a string");
        assert.ok(phrase.match(/\S/), "result contains text, not just spaces");
        phrase = phrase.replace(/[\S]/g, "");
        assert.ok(
          phrase.length === 4,
          "result contains 4 spaces joining the 5 words"
        );
      });
      it("should return 5 concatenated words when join is used with an empty string and exactly: 5", () => {
        const phrase = generate({ exactly: 5, join: "" });
        assert.ok(typeof phrase === "string", "result is a string");
        assert.ok(phrase.match(/\w/), "result contains text, no spaces");
      });
      it("should return 5 words when called with exactly: 5 and join: false", () => {
        const words = generate({ exactly: 5, join: false });
        assert.ok(words.length === 5, "contains 5 elements");
      });
      it("should return 5 words when called with exactly: 5 and join: null", () => {
        const words = generate({ exactly: 5, join: null });
        assert.ok(words.length === 5, "contains 5 elements");
      });
      it("should return one word with a minimum of 8 letters", () => {
        const minWordSize = 8;
        const word = generate({ minLength: minWordSize });

        assert.ok(typeof word === "string", "word is a string");
        assert.ok(word.length >= minWordSize, "result is less than 8 letters");
      });
      it("should return one word with a maximum of 5 letters", () => {
        const maxWordSize = 5;
        const word = generate({ maxLength: maxWordSize });

        assert.ok(typeof word === "string", "word is a string");
        assert.ok(word.length <= maxWordSize, "result exceeded 5 letters");
      });
      it("should return one word with the length between 3 and 5 ", () => {
        const minLengthSize = 3;
        const maxLengthSize = 5;
        const word = generate({
          minLength: minLengthSize,
          maxLength: maxLengthSize,
        });

        assert.ok(typeof word === "string", "word is a string");
        assert.ok(
          word.length >= minLengthSize && word.length <= maxLengthSize,
          "result is not between the limit of 3 and 5"
        );
      });
      it("should only return words with a minimum of 8 letters", () => {
        const minWordSize = 8;
        const words = generate({ exactly: 10000, minLength: minWordSize });
        words.forEach((word) => {
          assert.ok(word.length >= minWordSize, "result is less than 8 letters");
        });
      });
      it("should only return words with a maximum of 5 letters", () => {
        const maxWordSize = 5;
        const words = generate({ exactly: 10000, maxLength: maxWordSize });
        words.forEach((word) => {
          assert.ok(word.length <= maxWordSize, "result exceeded 5 letters");
        });
      });
      it("should only return words with the length between 3 and 5", () => {
        const minLengthSize = 3;
        const maxLengthSize = 5;
        const words = generate({
          exactly: 10000,
          minLength: minLengthSize,
          maxLength: maxLengthSize,
        });
        words.forEach((word) => {
          assert.ok(
            word.length >= minLengthSize && word.length <= maxLengthSize,
            "result is not between the limit of 3 and 5"
          );
        });
      });
      it("should only return words with length = 5", () => {
        const wordSize = 5;
        const words = generate({
          exactly: 10000,
          minLength: wordSize,
          maxLength: wordSize,
        });
        words.forEach((word) => {
          assert.ok(word.length === wordSize, "word length is different from 5");
        });
      });
      it("maxLength larger than the longest word should not result in an endless loop", () => {
        const wordSize = 100000;
        const words = generate({
          exactly: 1000,
          maxLength: wordSize,
        });
        words.forEach((word) => {
          assert.ok(word.length <= getLongestWordLengthFromList(wordList));
        });
      });
      it("minLength larger than the longest word should not result in an endless loop", () => {
        const wordSize = 100000;
        const words = generate({
          exactly: 1000,
          minLength: wordSize,
        });
        words.forEach((word) => {
          assert.ok(word.length <= getLongestWordLengthFromList(wordList));
        });
      });
      it("must return a word even without passing a number to minLength and maxLength", () => {
        const word1 = generate({ minLength: undefined, maxLength: false });
        const word2 = generate({ minLength: "string", maxLength: null });
        assert.ok(
          typeof word1 === "string" && typeof word2 === "string",
          "result is not a string"
        );
      });
      it("should return 5 space separated words for each string if wordsPerString is set to 5 and exactly > 1", () => {
        const words = generate({ exactly: 10, wordsPerString: 5 });
        words.forEach((string) => {
          const stringSplitted = string.split(" ");
          assert.ok(
            stringSplitted.length === 5,
            "the i-th string contains 5 words"
          );
        });
      });
      it("should return 5 words separated by a separator for each string if wordsPerString > 1, separator is defined as a string and exactly > 1", () => {
        const separator = "-";
        const words = generate({ exactly: 10, wordsPerString: 5, separator });
        words.forEach((string) => {
          const stringSplitted = string.split(separator);
          assert.ok(typeof separator === "string", "separator is a string");
          assert.ok(
            stringSplitted.length === 5,
            "the i-th string contains 5 words"
          );
        });
      });
      it("should return styled strings if formatter is defined as a function that returns a string", () => {
        const formatter = (word) => word.toUpperCase();
        assert.ok(typeof formatter === "function", "formatter is a function");
        assert.ok(
          typeof formatter("test") === "string",
          "formatter returns a string"
        );
        const words = generate({ exactly: 10, formatter });
        words.forEach((word) => {
          assert.ok(word === word.toUpperCase(), "word is formatted");
        });
      });
      it("should return the same words if the same seed is used", () => {
        const seed = "seed1";
        const exactly = 20;
        const join = " ";

        const words = generate({ seed, exactly, join });
        const words2 = generate({ seed, exactly, join });

        assert.ok(words === words2, "words are the same");
      });
      it("should return the same number of words if the same seed is used", () => {
        const seed = "seed1";
        const min = 1;
        const max = 10;

        const words = generate({ seed, min, max });
        const words2 = generate({ seed, min, max });

        assert.ok(words.length === words2.length, "number of words is the same");
      });
      it("should return different words if no seeds are provided", () => {
        const exactly = 20;
        const join = " ";

        const words = generate({ exactly, join });
        const words2 = generate({ exactly, join });

        // with 1952 possible words, at least one word in 20 should be different
        assert.ok(words !== words2, "words are different");
      });
      it("should return different words if different seeds are used", () => {
        const exactly = 20;

        const words = generate({ seed: "seed1", exactly });
        const words2 = generate({ seed: "seed2", exactly });

        // with these seeds, all words should be different
        for (let i = 0; i < exactly; i++) {
          assert.ok(words[i] !== words2[i], "words are different");
        }
      });
      it("should return different number of words if different seeds are used", () => {
        const min = 1;
        const max = 10;

        const words = generate({ seed: "seed1", min, max });
        const words2 = generate({ seed: "seed2", min, max });

        // with these seeds, the number of words should 5 and 3
        assert.ok(words.length !== words2.length, "number of words is different");
      });
    });
    describe("with a custom word list", () => {
      it("should return one word when called with wordList: customWordList", () => {
        const word = generate({ wordList: customWordList });
        assert.ok(typeof word === "string", "word is a string");
        assert.ok(word.length, "word is not empty");
      });
      it("should return between 5 and 10 words when called with min: 5,  max: 10, and wordList: customWordList", () => {
        const words = generate({ min: 5, max: 10, wordList: customWordList });
        assert.ok(words.length >= 5 && words.length <= 10);
      });
      it("should return one word with a minimum of 8 letters from a custom word list", () => {
        const minWordSize = 8;
        const word = generate({ minLength: minWordSize, wordList: customWordList });

        assert.ok(typeof word === "string", "word is a string");
        assert.ok(word.length >= minWordSize, "result is less than 8 letters");
      });
      describe("must return one word even when called with a malformed (not string[]) custom word list", () => {
        it("when the custom word list is empty", () => {
          const word = generate({ wordList: [] });
          assert.ok(typeof word === "string", "word is a string");
          assert.ok(word.length, "word is not empty");
          assert.ok(word.indexOf(" ") === -1, "word does not contain spaces");
        });
        it("when the custom word list is an `undefined`", () => {
          const word = generate({ wordList: undefined });
          assert.ok(typeof word === "string", "word is a string");
          assert.ok(word.length, "word is not empty");
        })
        it("when the custom word list is a `null`", () => {
          const word = generate({ wordList: null });
          assert.ok(typeof word === "string", "word is a string");
          assert.ok(word.length, "word is not empty");
        })
        it("when the custom word list is a `number`", () => {
          const word = generate({ wordList: 123456 });
          assert.ok(typeof word === "string", "word is a string");
          assert.ok(word.length, "word is not empty");
        })
        it("when the custom word list is a `string`", () => {
          const word = generate({ wordList: "adasdsdas" });
          assert.ok(typeof word === "string", "word is a string");
          assert.ok(word.length, "word is not empty");
        })
        it("when the custom word list is an `object`", () => {
          const word = generate({ wordList: {} });
          assert.ok(typeof word === "string", "word is a string");
          assert.ok(word.length, "word is not empty");
        })
        it("when the custom word list is a mixed array with no `string`", () => {
          const word = generate({ wordList: [[], undefined, null, 123456] });
          assert.ok(typeof word === "string", "word is a string");
          assert.ok(word.length, "word is not empty");
        })
        it("when the custom word list is a mixed array with one `string`", () => {
          const word = generate({ wordList: [[], undefined, null, 123456, "test"] });
          assert.ok(typeof word === "string", "word is a string");
          assert.ok(word === "test", "word is \"test\"");
          assert.ok(word.length, "word is not empty");
        })
      });
      it("must return a word even with passing a number larger than the longest word in a custom word list to minLength", () => {
        const minWordSize = getLongestWordLengthFromList(customWordList) + 1;
        const word = generate({ minLength: minWordSize, wordList: customWordList });

        assert.ok(typeof word === "string", "word is a string");
        assert.ok(word.length >= (minWordSize - 1), "result is less than 8 letters");
      });
      it("should return one word with a maximum of 5 letters from a custom word list", () => {
        const maxWordSize = 5;
        const word = generate({ maxLength: maxWordSize, wordList: customWordList });

        assert.ok(typeof word === "string", "word is a string");
        assert.ok(word.length <= maxWordSize, "result exceeded 5 letters");
      });
      it("should return one word with the length between 3 and 5 from a custom word list", () => {
        const minLengthSize = 3;
        const maxLengthSize = 5;
        const word = generate({
          minLength: minLengthSize,
          maxLength: maxLengthSize,
          wordList: customWordList
        });
        assert.ok(typeof word === "string", "word is a string");
        assert.ok(
          word.length >= minLengthSize && word.length <= maxLengthSize,
          "result is not between the limit of 3 and 5"
        );
      });
    });
  });

  describe("count()", () => {
    describe("with the default word list", () => {
      it("should return the correct count when no options are provided", () => {
        const totalWords = count();
        assert.ok(typeof totalWords === "number" && totalWords === wordList.length , "total number of words is a number and is not 0");
      });
      it("should return the correct count when minLength and maxLength options are provided", () => {
        const totalWords = count({ minLength: 5, maxLength: 8 });
        assert.ok(typeof totalWords === "number" && totalWords !== 0 , "total number of words is a number and is not 0");
      });
      it("should return the correct count when only minLength option is provided", () => {
        const totalWords = count({ minLength: 8 });
        assert.ok(typeof totalWords === "number" && totalWords !== 0 , "total number of words is a number and is not 0");
      });
      it("should return 0 when no word satisfy the length criteria", () => {
        const totalWords = count({ minLength: 30, maxLength: 35 });
        assert.ok(totalWords === 0 , "total number of words should be 0 when no words satisfy the length criteria");
      });
      it("should return 0 when minLength is greater than maxLength", () => {
        const totalWords = count({ minLength: 10, maxLength: 5 });
        assert.ok(totalWords === 0 , "total number of words should be 0 when minLength is greater than maxLength");
      });
      it("should return the default count when incorrect arguments are provided", () => {
        const totalWords = count("Illegal arguments");
        assert.ok(typeof totalWords === "number" && totalWords !== 0 , "total number of words is a number and is not 0");
      });
      it("should ignore a non-number minLength and return the correct count", () => {
        const totalWords = count({ minLength: "5" });
        assert.ok(typeof totalWords === "number" && totalWords === wordList.length , "total number of words is a number and is not 0");
      });
      it("should ignore other options and return the count based on minLength and maxLength only", () => {
        const options = { minLength: 4, maxLength: 7, separator: "-", formatter: (word) => word.toUpperCase(), seed: "random" };
        const totalWords = count(options);
        assert.ok(typeof totalWords === "number" && totalWords !== 0 , "total number of words is a number and is not 0");
      });
      it("should return 0 when negative minLength and maxLength are passed", () => {
        const totalWords = count({ minLength: -20, maxLength: -10 });
        assert.ok(totalWords === 0 , "total number of words should be 0 when no words satisfy the length criteria");
      });
      it("should return the correct count when minLength is -1 and maxLength is 10", () => {
        const totalWords = count({ minLength: -1, maxLength: 10 });
        assert.ok(typeof totalWords === "number" && totalWords !== 0 , "total number of words is a number and is not 0");
      });
    });

    describe("with a custom word list", () => {
      it("should return the correct count when a custom word list is provided", () => {
        const totalWords = count({ wordList: customWordList });
        assert.ok(typeof totalWords === "number" && totalWords === customWordList.length, "total number of words is a number and is not 0");
      });
      it("should return the correct count when minLength, maxLength, and wordList options are provided", () => {
        const totalWords = count({ minLength: 5, maxLength: 8, wordList: customWordList });
        assert.ok(typeof totalWords === "number" && totalWords !== 0 , "total number of words is a number and is not 0");
      });
      it("should return 0 when no word in the custom list satisfy the length criteria", () => {
        const totalWords = count({ minLength: 30, maxLength: 35, wordList: customWordList });
        assert.ok(totalWords === 0 , "total number of words should be 0 when no words satisfy the length criteria");
      });
      it("should return 0 when minLength is greater than maxLength", () => {
        const totalWords = count({ minLength: 10, maxLength: 5, wordList: customWordList });
        assert.ok(totalWords === 0 , "total number of words should be 0 when minLength is greater than maxLength");
      });
    });
  });
})
