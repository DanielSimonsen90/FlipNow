import { GameAction, GameActionProps } from '../GameProviderTypes';

import GameCreate from './CREATE.game.actions';
import GameDelete from './DELETE.game.actions';
import GameFlip from './FLIP.game.actions';
import GameJoin from './JOIN.game.actions';
import GameKick from './KICK.game.actions';
import GameLeave from './LEAVE.game.actions';
import GameStart from './START.game.actions';
import GameStop from './STOP.game.actions';

export default {
  CREATE: GameCreate,
  DELETE: GameDelete,
  FLIP: GameFlip,
  JOIN: GameJoin,
  KICK: GameKick,
  LEAVE: GameLeave,
  START: GameStart,
  STOP: GameStop,
} as Record<GameAction, GameActionProps<any>>;