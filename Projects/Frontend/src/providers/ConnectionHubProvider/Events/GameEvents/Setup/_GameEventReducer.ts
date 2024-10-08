import { Nullable } from 'types';
import { ActiveGame } from 'models/backend';

import Events from "../";
import { GameEventProps, HubGameEventNames } from './_GameEventTypes';

export default async function GameEventReducer<Event extends HubGameEventNames>(
  event: Event,
  { user, args, ...context }: GameEventProps<Event>
): Promise<Nullable<ActiveGame>> {
  if (!Events[event]) throw new Error(`Invalid event: ${event}`);
  if (
    !context.player
    && !(
      event === 'playerJoined'
      && (args as unknown as GameEventProps<'playerJoined'>['args'])
      [0].players.some(p => p.user.id === user.id)
    )
  ) {
    // console.log('No player found for event', event, context, args);
    return context.game;
  }

  const { callback } = Events[event];
  // console.log(`[${event}]`, args);

  const update = await callback({ ...context, user, args });
  // console.log('Received update', update);
  return update;
}