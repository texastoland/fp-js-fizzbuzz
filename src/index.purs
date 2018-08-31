module Main where

import Prelude

import Data.Array ((..))
import Data.Foldable (foldMap)
import Data.Maybe (Maybe(..), fromMaybe)
import Effect.Console (log)
import Unsafe.Coerce (unsafeCoerce)

-- types
type Rule
  = Int -> Maybe String

type Cond
  = (Int -> Boolean) -> String -> Rule

type Game
  = Array Rule -> Int -> String

-- logic
cond :: Cond
cond test s i = if test i
  then Just s
  else Nothing

game :: Game
game rules' i = (show i) `fromMaybe` foldMap applyRule rules'
  where
  applyRule f = f i

-- rules
divisBy y x = x `mod` y == 0

rules = [ cond (divisBy 3) "🐭"
        , cond (divisBy 5) "🐱"
        , cond (divisBy 5) "🐶"
        ]

-- run
range2D w h = do
  i <- 0 .. (h - 1)
  pure $ (i * w + 1) .. ((i + 1) * w)

main = logAny $ game rules `mapmap` range2D 10 10
  where
  logAny = log <<< unsafeCoerce
  mapmap = map <<< map
