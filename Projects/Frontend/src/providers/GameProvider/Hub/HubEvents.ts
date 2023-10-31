import { ActiveGame } from "models/backend";

/**
 * These events are emitted to the server from the client
 * Client => Server
 */
export type ServerHubEvents = {
  startGame: [];
  endGame: [];
  deleteGame: [];

  joinGame: [userId: string];
  leaveGame: [playerId: string];

  flipCard: [cardIndex: number];
}

/**
 * These events are emitted to the client from the server
 * Server => Client
 */
export type ClientHubEvents = {
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

export type HubEvents = ServerHubEvents & ClientHubEvents;

export type HubEventNames = keyof HubEvents;