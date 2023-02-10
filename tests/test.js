var assert = require('assert');
var randomWords = require('../index.js');

describe('random-words', function () {
    it('should return one word when called with no arguments', function () {
        var word = randomWords();
        assert.ok(typeof(word) === 'string', 'word is a string');
        assert.ok(word.length, 'word is not empty');
        assert.ok(word.indexOf(' ') === -1, 'word does not contain spaces');
    });
    it('should return 5 words when called with the number 5', function () {
        var words = randomWords(5);
        assert.ok(words.length === 5, 'contains 5 elements');
    });
    it('should return between 5 and 10 words when called with min: 5 and max: 10', function () {
        var words = randomWords({min: 5, max: 10});
        assert.ok((words.length >= 5) && (words.length <= 10));
    });
    it('returns result of variable length when called with min: 5 and max: 10', function () {
        var lengths = {};
        for (var i = 0; (i < 100); i++) {
            var words = randomWords({min: 5, max: 10});
            lengths[words.length] = true;
        }
        assert.ok(Object.keys(lengths).length > 1, 'result varies in length');
    });
    it('should return 5 space separated words when join is used with exactly: 5', function () {
        var phrase = randomWords({exactly: 5, join: ' '});
        assert.ok((typeof(phrase) === 'string'), 'result is a string');
        assert.ok(phrase.match(/\S/), 'result contains text, not just spaces');
        phrase = phrase.replace(/[\S]/g, '');
        assert.ok(phrase.length === 4, 'result contains 4 spaces joining the 5 words');
    });
    it('should return 5 concatenated words when join is used with an empty string and exactly: 5', function () {
        var phrase = randomWords({exactly: 5, join: ''});
        assert.ok((typeof(phrase) === 'string'), 'result is a string');
        assert.ok(phrase.match(/\w/), 'result contains text, no spaces');
    });
    it('should return 5 words when called with exactly: 5 and join: false', function () {
        var words = randomWords({exactly: 5, join: false});
        assert.ok(words.length === 5, 'contains 5 elements');
    });
    it('should return 5 words when called with exactly: 5 and join: null', function () {
        var words = randomWords({exactly: 5, join: null});
        assert.ok(words.length === 5, 'contains 5 elements');
    });
    it('should only return words within the maxLength', function () {
        var maxWordSize = 4
        var words = randomWords({exactly: 10000, maxLength: maxWordSize});
        words.forEach(word => {
            assert.ok(word.length <= maxWordSize && word.length > 0, 'result is smaller than max size: ' + maxWordSize)
        });
    });
    it('should return 5 space separated words for each string if wordsPerString is set to 5 and exactly > 1', function () {
        var words = randomWords({exactly: 10, wordsPerString: 5});
        words.forEach(string => {
            stringSplitted = string.split(' ');
            assert.ok(stringSplitted.length === 5, 'the i-th string contains 5 words');
        });
    });
    it('should reuturn 5 words separated by a separator for each string if wordsPerString > 1, separator is defined as a string and exactly > 1', function () {
        const separator = '-';
        var words = randomWords({exactly: 10, wordsPerString: 5, separator});
        words.forEach(string => {
            stringSplitted = string.split(separator);
            assert.ok(typeof(separator) === 'string', 'separator is a string');
            assert.ok(stringSplitted.length === 5, 'the i-th string contains 5 words');
        });
    });
    it('should return styled strings if formatter is defined as a function that returns a string', function () {
        formatter = (word) => word.toUpperCase();
        assert.ok(typeof(formatter) === 'function', 'formatter is a function');
        assert.ok(typeof(formatter('test')) === 'string', 'formatter returns a string');
        var words = randomWords({exactly: 10, formatter});
        words.forEach(word => {
            assert.ok(word === word.toUpperCase(), 'word is formatted')
        });
    });
    it('should return the same words if the same seed is used', function () {
        const seed = 'seed1'
        const exactly = 20;
        const join = ' ';

        const words = randomWords({ seed, exactly, join });
        const words2 = randomWords({ seed, exactly, join });

        assert.ok(words == words2, 'words are the same')
    });
    it('should return the same number of words if the same seed is used', function () {
        const seed = 'seed1'
        const min = 1;
        const max = 10;

        const words = randomWords({ seed, min, max });
        const words2 = randomWords({ seed, min, max });

        assert.ok(words.length == words2.length, 'number of words is the same')
    });
    it('should return different words if no seeds are provided', function () {
        const exactly = 20;
        const join = ' ';

        const words = randomWords({ exactly, join });
        const words2 = randomWords({ exactly, join });

        // with 1952 possible words, at least one word in 20 should be different
        assert.ok(words != words2, 'words are different')
    });
    it('should return different words if different seeds are used', function () {
        const exactly = 20;

        const words = randomWords({ seed: 'seed1', exactly });
        const words2 = randomWords({ seed: 'seed2', exactly });

        // with these seeds, all words should be different
        for (let i = 0; i < exactly; i++) {
            assert.ok(words[i] != words2[i], 'words are different')
        }
    });
    it('should return different number of words if different seeds are used', function () {
        const min = 1;
        const max = 10;

        const words = randomWords({ seed: 'seed1', min, max });
        const words2 = randomWords({ seed: 'seed2', min, max });

        // with these seeds, the number of words should 5 and 3
        assert.ok(words.length != words2.length, 'number of words is different')
    });
});

