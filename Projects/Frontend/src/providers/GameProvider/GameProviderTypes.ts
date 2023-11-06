import { ActiveGame, Player } from "models/backend";
import { HubGameActionNames, HubGameActions } from "providers/ConnectionHubProvider/Actions/GameActions/Setup";
import { Nullable } from "types";

export type GameProviderContextType<AllowNullable extends boolean = true> = {
  game: AllowNullable extends true ? Nullable<ActiveGame> : ActiveGame;
  player: AllowNullable extends true ? Nullable<Player> : Player;
  
  isClientTurn: boolean;
  isHost: boolean;

  dispatch<Action extends HubGameActionNames>(
    action: Action,
    ...args: HubGameActions[Action]
  ): Promise<void>;
};