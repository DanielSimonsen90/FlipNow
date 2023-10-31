import LoginContainerFactory from "components/shared/LoginContainer";
import { useAsyncEffect } from "danholibraryrjs";
import { useGame } from "providers/GameProvider";
import { useUser } from "providers/UserProvider";
import { useNavigate, useParams } from "react-router";

export default function Invite() {
  const { user } = useUser();
  const { game, dispatch } = useGame();
  const navigate = useNavigate();
  const { inviteCode } = useParams();

  useAsyncEffect(async () => {
    if (game) return navigate('/'); 
    if (user) dispatch('JOIN', user, inviteCode);
  }, [user, game]);
  
  return (
    <main>
      <h1>You have been invited to join a game!</h1>
      <p>Please login to accept the invite.</p>
      <LoginContainerFactory />
    </main>
  );
}