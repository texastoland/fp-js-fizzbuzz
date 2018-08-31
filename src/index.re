open BsAbstract;

module FoldMapAOS = Array.Foldable.Fold_Map(Functors.OptionF.String.Monoid);

/* types */
type rule = int => option(string);
type cond = (int => bool, string) => rule;
type game = (array(rule), int) => string;

/* logic */
let cond: cond = (test, s, i) => test(i) ? Some(s) : None;
let game: game =
  (rules, i) => {
    open Option.Infix;
    let applyRule = f => f(i);
    Int.Show.show(i) |? FoldMapAOS.fold_map(applyRule, rules);
  };

/* rules */
let divis = (~by, i) => i mod by == 0;
let rules = [|
  cond(divis(~by=3), {js|🐭|js}),
  cond(divis(~by=5), {js|🐱|js}),
  cond(divis(~by=7), {js|🐶|js}),
|];

/* run */
let (--) = Belt.Array.range;
let range2D = (~w, ~h) => {
  open! Array.Infix;
  0 -- (h - 1) <#> (i => i * w + 1 -- (i + 1) * w);
};
let () = {
  open! Function.Infix;
  Js.log(Array.Functor.(map <. map)(game(rules), range2D(~w=10, ~h=10)));
};
