import { HubActionNames, BaseCreateHubAction, BaseActionProps } from './HubActionTypes';

import GameActions from './GameActions';

export default {
  ...GameActions,
} as Record<HubActionNames, BaseCreateHubAction<any, BaseActionProps<any>, any>>;