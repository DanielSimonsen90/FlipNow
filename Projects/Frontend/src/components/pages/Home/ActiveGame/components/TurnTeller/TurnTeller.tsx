import { PlayState } from "models/backend";
import { useGame } from "providers/GameProvider";
import { useEffect, useState } from "react";

const getDifferenceInSeconds = (date1: Date, date2: Date) => {
  return Math.round(Math.abs(date1.getTime() - date2.getTime()) / 1000);
}

export default function TurnTeller() {
  const { game, dispatch, isClientTurn } = useGame(false);
  const secondsSpent = getDifferenceInSeconds(new Date(), new Date(game.turn.turnStarted));
  const [_, setRenderCount] = useState(0); // Would use value from getDifferenceInSeconds, but initialValue isn't calculated properly
  const started = game.playState === PlayState.PLAYING;
  const turnPlayername = game.turn.player?.user.username ?? "Nobody";

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderCount(c => c + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      setRenderCount(0);
    }
  }, [started, game.turn.count]);

  useEffect(() => {
    if (started && isClientTurn && secondsSpent >= game.turn.timeout) {
      dispatch('flipCard', -1);
    }
  }, [secondsSpent, started, isClientTurn, game.turn.timeout])

  return started ? (
    <div className="turn-teller" data-is-turn={isClientTurn}>
      <h3>{isClientTurn ? 'Your' : `${turnPlayername}'s`} turn</h3>
      <p>Seconds elapsed: {secondsSpent} / {game.turn.timeout}</p>
    </div>
  ) : null;
}