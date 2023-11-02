import { Guid, TimeSpan } from "types";
import User from "./User";
import ActiveGame from "./ActiveGame";

export type Player = {
  readonly _gameCardsAmount: number;

  id: Guid;
  user: User<false>;
  game: ActiveGame;
  cardMatches: number;
  finished: boolean;
  timeSpentTurn: TimeSpan;
  timeSpentTotal: TimeSpan;
  get cardMatchesLeft(): number;
  get score(): number;
}

export default Player;