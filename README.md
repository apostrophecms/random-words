# random-words

## Generate one or more common English words

`random-words` generates random words for use as sample text. We use it to generate random blog posts when testing [Apostrophe](http://apostrophecms.org).

Cryptographic-quality randomness is NOT the goal, as speed matters for generating sample text and security does not. As such, `Math.random()` is used in most cases.

The `seed` option can be used for situations that require deterministic output. When given the same `seed` with the same input, `randomWords()` will yield deterministic results, in regards to both actual word selection and the number of words returned (when using `min` and `max`). The underlying implementation of this option utilizes the [seedrandom](https://www.npmjs.com/package/seedrandom) package as a replacement for `Math.random()`.

Installation:

    npm install random-words

Examples:

```js
import randomWords from "random-words";

console.log(randomWords());
//output: 'army'

console.log(randomWords(5));
//output: ['army', 'beautiful', 'became', 'if', 'actually']

console.log(randomWords({ minLength: 2 }));
//output: 'hello'

console.log(randomWords({ maxLength: 6 }));
//output: 'blue'

console.log(randomWords({ minLength: 5, maxLength: 5 }));
//output : 'world'

console.log(randomWords({ min: 3, max: 10 }));
//output: ['became', 'arrow', 'article', 'therefore']

console.log(randomWords({ exactly: 2 }));
//output: ['beside', 'between']

console.log(randomWords({ min: 2, max: 3, seed: "my-seed" }));
//output: ['plenty', 'pure']

// this call will yield exactly the same results as the last since the same `seed` was used and the other inputs are identical
console.log(randomWords({ min: 2, max: 3, seed: "my-seed" }));
//output: ['plenty', 'pure']

console.log(randomWords({ exactly: 5, join: " " }));
//output: 'army beautiful became if exactly'

console.log(randomWords({ exactly: 5, join: "" }));
//output: 'armybeautifulbecameifexactly'

console.log(randomWords({ exactly: 2, minLength: 4 }));
//output: ['atom', 'window']

console.log(randomWords({ exactly: 5, maxLength: 4 }));
//output: ['army', 'come', 'eye', 'five', 'fur']

console.log(randomWords({ exactly: 2, minLength: 3, maxLength: 3 }));
//output: ['you, 'are']

console.log(randomWords({ exactly: 5, wordsPerString: 2 }));
//ooutput: [ 'salt practical', 'also brief', 'country muscle', 'neighborhood beyond', 'grew pig' ]

console.log(randomWords({ exactly: 5, wordsPerString: 2, separator: "-" }));
//output: [ 'equator-variety', 'salt-usually', 'importance-becoming', 'stream-several', 'goes-fight' ]

console.log(
  randomWords({
    exactly: 5,
    wordsPerString: 2,
    formatter: (word) => word.toUpperCase(),
  })
);
//output: [ 'HAVING LOAD', 'LOST PINE', 'GAME SLOPE', 'SECRET GIANT', 'INDEED LOCATION' ]

console.log(
  randomWords({
    exactly: 5,
    wordsPerString: 2,
    formatter: (word, index) => {
      return index === 0
        ? word.slice(0, 1).toUpperCase().concat(word.slice(1))
        : word;
    },
  })
);
//output: [ 'Until smoke', 'Year strength', 'Pay knew', 'Fallen must', 'Chief arrow' ]
```
