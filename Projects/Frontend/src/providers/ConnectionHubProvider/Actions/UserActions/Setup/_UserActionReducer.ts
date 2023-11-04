import Actions from "../";
import { HubUserActionNames, UserActionProps } from "./_UserActionTypes";

export default async function UserActionReducer<Action extends HubUserActionNames>(
  action: Action,
  { broadcastToHub, args }: UserActionProps<Action>
): Promise<void> {
  if (!Actions[action]) throw new Error(`Invalid action: ${action}`);
  const { callback } = Actions[action];
  console.log(`[${action}]`, args);
  
  try {
    await callback({
      args,
      broadcastToHub,
    });
  } catch (error) {
    console.error(error);
  }
}