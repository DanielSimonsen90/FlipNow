import { Nullable } from "types";
import GameCard from "./GameCard";
import PlayState from "./PlayState";
import Player from "./Player";

export type ActiveGame = {
  readonly _invitePrefix: string;
  get inviteCode(): string;
  get inviteUrl(): string;

  get players(): Array<Player>

  _turnPlayerIndex: number;
  get turnPlayerIndex(): number;
  set turnPlayerIndex(value: number);

  get turnPlayer(): Nullable<Player>;
  get host(): Player;
  get leaderboard(): Array<Player>;

  get cards(): Array<GameCard>;
  playState: PlayState;
}

export default ActiveGame;