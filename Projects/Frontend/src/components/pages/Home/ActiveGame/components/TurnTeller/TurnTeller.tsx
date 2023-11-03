import { useTimeout } from "danholibraryrjs";
import { PlayState } from "models/backend";
import { useGame } from "providers/GameProvider";
import { useEffect, useState } from "react";

export default function TurnTeller() {
  const { game, isClientTurn } = useGame(false);
  const [secondsSpent, setSecondsSpent] = useState(0);
  const started = game.playState === PlayState.PLAYING;
  const turnPlayername = game.turn.player?.user.username ?? "Nobody";

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSpent(s => s + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      setSecondsSpent(0);
    }
  }, [started, game.turn.count]);

  return started ? (
    <div className="turn-teller" data-is-turn={isClientTurn}>
      <h3>{isClientTurn ? 'Your' : `${turnPlayername}'s`} turn</h3>
      <p>Seconds elapsed: {secondsSpent}</p>
    </div>
  ) : null;
}