import { Nullable } from "types";
import { BaseCreateHubEvent } from "../../HubEventTypes";
import { HubGameEventNames, GameEventRegisterProps, GameEventProps } from "./_GameEventTypes";
import { ActiveGame } from "models/backend";

export default function CreateGameEvent<Event extends HubGameEventNames>(
  event: Event,
  callback: GameEventRegisterProps<Event>['callback'],
): BaseCreateHubEvent<HubGameEventNames, GameEventProps<Event>, Nullable<ActiveGame> | void> {
  return {
    event,
    callback,
  };
}