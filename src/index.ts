import { array } from "fp-ts/lib/array";
import { foldMap } from "fp-ts/lib/foldable";
import { applyFlipped } from "fp-ts/lib/function";
import { Option, getMonoid, none, some } from "fp-ts/lib/option";
import { semigroupString } from "fp-ts/lib/semigroup";

// types
type Rule = (i: number) => Option<string>;
type Cond = (test: (i: number) => boolean, s: string) => Rule;
type Game = (rules: Rule[]) => (i: number) => string;

// logic
const cond: Cond = (test, s) => i => (test(i) ? some(s) : none);
const game: Game = rules => i => {
  const foldMap_ = foldMap(array, getMonoid(semigroupString));
  return foldMap_(rules, applyFlipped(i)).getOrElse(i.toString());
};

// rules
const divisBy = (y: number) => (x: number) => x % y === 0;
const rules = [
  cond(divisBy(3), "🐭"),
  cond(divisBy(5), "🐱"),
  cond(divisBy(7), "🐶")
];

// run
const range = (start: number, end: number) =>
  [...Array(end - start + 1).keys()].map(i => i + start);
const range2D = (w: number, h: number) =>
  range(0, h - 1).map(i => range(i * w + 1, (i + 1) * w));
console.log(range2D(10, 10).map(y => y.map(game(rules))));
