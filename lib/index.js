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
const range = n => [...Array(n).keys()];
const range2D = (w, h) => {
  const int = y => x => y * w + x + 1;
  const row = y => range(w).map(int(y));
  return range(h).map(row);
};
console.log(range2D(10, 10).map(y => y.map(game(rules))));
//# sourceMappingURL=index.js.map
