import ConnectionLogger from "components/shared/ConnectionLogger";
import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";
import { useEffect, useState } from "react";
import { getInviteUrlFromGame } from "utils";

export default function ActiveGame() {
  const [success, setSuccess] = useState(false);
  
  const { game, dispatch } = useGame();
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setSuccess(true);
    }, () => {
      setSuccess(false);
    });
  }

  useEffect(() =>{
    if (success) {
      alert('Copied to clipboard');
    }
  }, [success])

  if (!game) return null;

  return (
    <div>
      <h1>Game is active</h1>
      <div style={{ 
        width: `${game.inviteCode.length}ch`, 
        textAlign: 'center',
        padding: '1ch',
        backgroundColor: 'var(--background-tertiary)'
      }} contentEditable={false} onClick={() => {
        copy(getInviteUrlFromGame(game))
      }}>{game?.inviteCode}</div>
      <Button importance="secondary" onClick={() => {
        dispatch('deleteGame');
      }}>Delete game</Button>
      <ConnectionLogger />
    </div>
  );
}