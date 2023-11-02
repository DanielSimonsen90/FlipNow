import { Nullable } from "types";
import Player from "./Player";

export type GameCard = {
  name: string;
  flipped: boolean;
  flippedTimestamp: string;
  matchedBy: Nullable<Player>;
  get matched(): boolean;
}

export default GameCard;