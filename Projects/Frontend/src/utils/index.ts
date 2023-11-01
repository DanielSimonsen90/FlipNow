import { ActiveGame } from 'models/backend';

export * from './ApiUtil';

export function getInviteUrlFromGame(game: ActiveGame) {
  return `${window.location.origin}/invite/${game.inviteCode}`;
}