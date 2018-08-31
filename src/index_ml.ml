open BsAbstract

module FoldMapAOS = Array.Foldable.Fold_Map(Functors.OptionF.String.Monoid)
module PPXLetA = PPX_Let.Make(Array.Monad)

(* types *)
type rule = int -> string option
type cond = (int -> bool) -> string -> rule
type game = rule array -> int -> string

(* logic *)
let cond : cond = fun test s i -> if test i then Some s else None
let game : game = fun rules i ->
  let open Option.Infix in
  let applyRule f = f i in
  Int.Show.show i |? FoldMapAOS.fold_map applyRule rules

(* rules *)
let divis ~by i = i mod by = 0
let rules = [|
  cond (divis ~by:3) {js|🐭|js};
  cond (divis ~by:5) {js|🐱|js};
  cond (divis ~by:7) {js|🐶|js};
|]

(* run *)
let (--) = Belt.Array.range
let range2D ~w ~h =
  let open PPXLetA in
  let%map i = 0 -- (h - 1) in
  i * w + 1 -- (i + 1) * w
let () =
  let open Function.Infix in
  Js.log (Array.Functor.(map <. map) (game rules) (range2D ~w:10 ~h:10))
