# fp-js-fizzbuzz

- Comparison of a FP fizzbuzz implementation in various compile-to-JavaScript languages
- Compiled and prettified JavaScript included
- All [package scripts](package.json) needed to make your own playground

## Implementation

|         | [TypeScript][ts]                  | [Reason][re]                                                                          | [PureScript][ps]                            |
| ------- | --------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------- |
| Library | [fp-ts][fp-ts] (@gcanti)          | [bs-abstract][bs-abs] (@Risto-Stevcev)                                                | [Prelude][prelude]                          |
| Source  | [`index.ts`](src/index.ts)        | [`index.re`](src/index.re) [`index_ml.ml`](src/index_ml.ml)                           | [`index.purs`](src/index.purs)              |
| Bundle  | [`index.js`](lib/js/src/index.js) | [`index.bs.js`](lib/js/src/index.bs.js) [`index_ml.bs.js`](lib/js/src/index_ml.bs.js) | [`index.purs.js`](lib/js/src/index.purs.js) |

## Inspiration

- [_An Elegant Fizzbuzz_][parsonsmatt] by @parsonsmatt
- [_Amusing interviewers with Functional Programming_][mvaldesdeleon] by @mvaldesdeleon

[ts]: https://www.typescriptlang.org/play/
[re]: https://reasonml.github.io/en/try
[ps]: http://try.purescript.org/
[fp-ts]: https://github.com/gcanti/fp-ts
[bs-abs]: https://github.com/Risto-Stevcev/bs-abstract
[prelude]: https://github.com/purescript/purescript-prelude
[parsonsmatt]: http://www.parsonsmatt.org/2016/02/27/an_elegant_fizzbuzz.html
[mvaldesdeleon]: https://medium.com/@mvaldesdeleon/amusing-interviewers-with-functional-programming-e48b92255287
