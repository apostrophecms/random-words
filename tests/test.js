var assert = require('assert');
var randomWords = require('../index.js');

describe('random-words', function() {
  it('should return one word when called with no arguments', function() {
    var word = randomWords();
    assert.ok(typeof(word) === 'string', 'word is a string');
    assert.ok(word.length, 'word is not empty');
    assert.ok(word.indexOf(' ') === -1, 'word does not contain spaces');
  });
  it('should return 5 words when called with the number 5', function() {
    var words = randomWords(5);
    assert.ok(words.length === 5, 'contains 5 elements');
  });
  it('should return between 5 and 10 words when called with min: 5 and max: 10', function() {
    var words = randomWords({ min: 5, max: 10 });
    assert.ok((words.length >= 5) && (words.length <= 10));
  });
  it('returns result of variable length when called with min: 5 and max: 10', function() {
    var lengths = {};
    for (var i = 0; (i < 100); i++) {
      var words = randomWords({ min: 5, max: 10 });
      lengths[words.length] = true;
    }
    assert.ok(Object.keys(lengths).length > 1, 'result varies in length');
  })
  it('should return 5 space separated words when join is used with exactly: 5', function() {
    var phrase = randomWords({ exactly: 5, join: ' ' });
    assert.ok((typeof(phrase) === 'string'), 'result is a string');
    assert.ok(phrase.match(/\S/), 'result contains text, not just spaces');
    phrase = phrase.replace(/[\S]/g, '');
    assert.ok(phrase.length === 4, 'result contains 4 spaces joining the 5 words');
  });
});

