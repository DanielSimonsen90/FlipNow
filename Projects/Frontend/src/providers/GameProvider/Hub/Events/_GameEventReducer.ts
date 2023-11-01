import Events from ".";
import { GameEventProps } from "../../GameProviderTypes";
import { HubEventNames } from "..";
import { Nullable } from 'types';
import { ActiveGame } from 'models/backend'

export async function GameEventReducer<Event extends HubEventNames>(
  event: Event,
  { user, args, ...context }: GameEventProps<Event>
): Promise<Nullable<ActiveGame>> {
  if (!Events[event]) throw new Error(`Invalid event: ${event}`);
  const { callback } = Events[event];
  console.log(`[${event}]: ${JSON.stringify(args)}`);

  try {
    const update = await callback({ ...context, user, args });
    return update;

  } catch (error) {
    console.error(error);
    return context.game;
  }
}