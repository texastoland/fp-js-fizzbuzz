open BsAbstract;

module FoldMapAOS = Array.Foldable.Fold_Map(Functors.OptionF.String.Monoid);
/* module PPXLetA = PPX_Let.Make(Array.Monad); */

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
let (--^) = (start, finish) => Belt.Array.range(start, finish - 1);
let range2D = (~w, ~h) => {
  open Array.Infix;
  let int = (y, x) => y * w + x + 1;
  let row = y => int(y) <$> 0 --^ w;
  row <$> 0 --^ h;
  /* alternatively:
     open PPXLetA;
     let%map y = 0 --^ h;
     let%map x = 0 --^ w;
     y * w + x + 1; */
};
let () = {
  open! Function.Infix;
  Js.log(Array.Functor.(map <. map)(game(rules), range2D(~w=10, ~h=10)));
};
