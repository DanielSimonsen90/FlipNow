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
  gameStarted: [inviteCode: string, game: ActiveGame];
  cardFlipped: [inviteCode: string, game: ActiveGame]
  gameUpdated: [inviteCode: string, game: ActiveGame];
  gameReset: [inviteCode: string, game: ActiveGame];
  gameEnded: [inviteCode: string, game: ActiveGame];
  gameDeleted: [];

  playerJoined: [inviteCode: string, game: ActiveGame];
  playerLeft: [inviteCode: string, game: ActiveGame];

  // Development
  broadcastFailed: [inviteCode: string, message: string];
  log: [inviteCode: string, timestamp: string, message: string];
}
export type HubEventNames = keyof HubEvents;