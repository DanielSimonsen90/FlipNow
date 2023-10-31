import { ActiveGame } from "models/backend";

/**
 * These events are emitted to the server from the client
 * Client => Server
 */
export type HubActions = {
  createGame: [];
  startGame: [];
  endGame: [];
  deleteGame: [];

  joinGame: [inviteCode: string, userId: string];
  leaveGame: [playerId: string];

  flipCard: [cardIndex: number];
}
export type HubActionNames = keyof HubActions;

/**
 * These events are emitted to the client from the server
 * Server => Client
 */
export type HubEvents = {
  gameStarted: [game: ActiveGame];
  gameUpdated: [game: ActiveGame];
  gameReset: [game: ActiveGame];
  gameEnded: [game: ActiveGame];

  playerJoined: [game: ActiveGame];
  playerLeft: [game: ActiveGame];

  // Development
  broadcastFailed: [message: string];
  log: [message: string];
}
export type HubEventNames = keyof HubEvents;