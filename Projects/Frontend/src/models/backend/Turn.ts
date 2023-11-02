import { Nullable, TimeSpan } from "types";
import Player from "./Player";

export type Turn = {
  player: Nullable<Player>
  turnStarted: string;
  timeSpent: TimeSpan;
}