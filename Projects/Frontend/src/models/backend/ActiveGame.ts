import GameCard from "./GameCard";
import PlayState from "./PlayState";
import Player from "./Player";
import { Turn } from "./Turn";

export type ActiveGame = {
  readonly _invitePrefix: string;
  get inviteCode(): string;
  get inviteUrl(): string;

  get players(): Array<Player>

  _turnPlayerIndex: number;
  get turnPlayerIndex(): number;
  set turnPlayerIndex(value: number);

  get turn(): Turn;
  get host(): Player;
  get leaderboard(): Array<Player>;

  get cards(): Array<GameCard>;
  playState: PlayState;
}

export default ActiveGame;