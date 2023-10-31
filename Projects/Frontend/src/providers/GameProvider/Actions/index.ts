import { GameActionRegisterProps } from '../GameProviderTypes';
import { HubActionNames } from '../Hub';

import CreateGameAction from './createGame.action.game';

export default {
  createGame: CreateGameAction,
} as Record<HubActionNames, GameActionRegisterProps<any>>;