import { ActiveGame } from "models/backend";

type ServerHubEvents = {
  // Game lifecycle
  startGame: [];
  endGame: [];
  deleteGame: [];

  // PlayerPresence (join/leave)
  joinGame: [userId: string];
  leaveGame: [playerId: string];

  // Game updates
  flipCard: [cardIndex: number];
}

type ClientHubEvents = {
  gameStarted: [ActiveGame];
  gameUpdated: [ActiveGame];
  gameReset: [ActiveGame];
  gameEnded: [ActiveGame];

  playerJoined: [ActiveGame];
  playerLeft: [ActiveGame];

  // Development
  broadcastFailed: [message: string];
  log: [message: string];
  ping: [];
}

export type HubEvents = ServerHubEvents & ClientHubEvents;

export type HubEventNames = keyof HubEvents;