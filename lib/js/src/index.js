"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("fp-ts/lib/array");
const foldable_1 = require("fp-ts/lib/foldable");
const function_1 = require("fp-ts/lib/function");
const option_1 = require("fp-ts/lib/option");
const semigroup_1 = require("fp-ts/lib/semigroup");
// logic
const cond = (test, s) => i => (test(i) ? option_1.some(s) : option_1.none);
const game = rules => i => {
  const foldMap_ = foldable_1.foldMap(
    array_1.array,
    option_1.getMonoid(semigroup_1.semigroupString)
  );
  return foldMap_(rules, function_1.applyFlipped(i)).getOrElse(i.toString());
};
// rules
const divisBy = y => x => x % y === 0;
const rules = [
  cond(divisBy(3), "🐭"),
  cond(divisBy(5), "🐱"),
  cond(divisBy(7), "🐶")
];
// run
const range = (start, end) =>
  [...Array(end - start + 1).keys()].map(i => i + start);
const range2D = (w, h) =>
  range(0, h - 1).map(i => range(i * w + 1, (i + 1) * w));
console.log(range2D(10, 10).map(y => y.map(game(rules))));
//# sourceMappingURL=index.js.map
