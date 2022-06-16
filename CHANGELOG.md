# Changelog

## 1.2.0 - 2022-06-16

* Adds typescript typings. Thanks to Tim Kennedy for this contribution.

## 1.1.2 - 2022-01-20

* Updates mocha to v9.

## 1.1.1

* Use `var` in a small amount of newer code that used `let`, to match ES5 legacy support status of the rest of the module. We should probably decide on a strategy for moving this module to ES6, but there is no urgency.

## 1.1.0

* Addition of `wordsPerString`, `separator` and `format` options. Thanks to Matteo Veraldi.

## 1.0.0

* Addition of `maxLength` option, thanks to Scoombe.

* Since this module has achieved considerable use, has good test coverage and has had no bug reports, we've declared version 1.0.0 stable. We will follow the semver standard from here on out.

## 0.0.1

Initial release.
