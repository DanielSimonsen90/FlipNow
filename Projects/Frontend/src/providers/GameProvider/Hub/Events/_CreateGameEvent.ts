import { GameEventRegisterProps } from "../../GameProviderTypes";
import { HubEventNames } from "..";

export default function CreateGameEvent<Event extends HubEventNames>(
  event: Event,
  callback: GameEventRegisterProps<Event>['callback'],
) {
  return {
    event,
    callback,
  };
}