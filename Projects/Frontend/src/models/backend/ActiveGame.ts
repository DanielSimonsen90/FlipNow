import GameCard from "./GameCard";
import { GameSettings } from "./GameSettings";
import PlayState from "./PlayState";
import Player from "./Player";
import { Turn } from "./Turn";

export type ActiveGame = {
  get lobbyName(): string;
  get inviteCode(): string;
  get lobbyLimit(): number;
  readonly maxPlayersAllowed: number;
  gameSettings: GameSettings;

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