import LoginContainerFactory from "components/shared/LoginContainer";
import { Button } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";
import { useUser } from "providers/UserProvider";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export default function Invite() {
  const { user } = useUser();
  const { game, dispatch } = useGame();
  const navigate = useNavigate();
  const { inviteCode } = useParams();
  if (!inviteCode) throw new Error('ReactRouter failed to get inviteCode');
  
  useEffect(() => {
    if (game) navigate('/'); // If the user is already in a game, don't let them join another
  })

  return (
    <main>
      <h1>You have been invited to join a game!</h1>
      {!user ? (
        <>
          <p>Please login to accept the invite.</p>
          <LoginContainerFactory />
        </>
      ) : (
          <Button onClick={() => dispatch('joinGame', inviteCode, user.id)}>Accept Invite</Button>
      )}
    </main>
  );
}