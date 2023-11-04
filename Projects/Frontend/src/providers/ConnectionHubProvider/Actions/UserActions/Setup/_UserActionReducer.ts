import Actions from "../";
import { HubUserActionNames, UserActiontReducerProps } from "./_UserActionTypes";

export default async function UserActionReducer<Action extends HubUserActionNames>(
  action: Action,
  { args, connection, ...props }: UserActiontReducerProps<Action>
): Promise<void> {
  if (!Actions[action]) throw new Error(`Invalid action: ${action}`);
  const { callback } = Actions[action];
  console.log(`[${action}]`, args);
  
  try {
    await callback({
      args, connection,
      ...props,
      broadcastToHub: (...args) => connection.send(action, ...args)
    });
  } catch (error) {
    console.error(error, connection);
  }
}