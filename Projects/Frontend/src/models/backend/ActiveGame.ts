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
  settings: GameSettings;

  get players(): Array<Player>
  _turnPlayerIndex: number;
  get turnPlayerIndex(): number;
  set turnPlayerIndex(value: number);
  get turn(): Turn;
  get host(): Player;
  get leaderboard(): Array<Player>;

  get cards(): Array<GameCard>;
  get maxCardsAllowed(): number;
  playState: PlayState;
}

export default ActiveGame;