import { GameActionRegisterProps } from '../GameProviderTypes';
import { HubActionNames } from '../Hub';

import CreateGameAction from './createGame.action.game';
import DeleteGameAction from './deleteGame.action.game';
import EndGameAction from './endGame.action.game';
import FlipCardAction from './flipCard.action.game';
import JoinGameAction from './joinGame.action.game';
import LeaveGameAction from './leaveGame.action.game';
import StartGameAction from './startGame.action.game';

export default {
  createGame: CreateGameAction,
  deleteGame: DeleteGameAction,
  endGame: EndGameAction,
  flipCard: FlipCardAction,
  joinGame: JoinGameAction,
  leaveGame: LeaveGameAction,
  startGame: StartGameAction,
} as Record<HubActionNames, GameActionRegisterProps<any>>;