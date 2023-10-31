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
  if (!inviteCode) throw new Error('ReactRouter failed to get inviteCode');

  useAsyncEffect(async () => {
    if (game) return navigate('/'); 
    if (user) {
      dispatch('joinGame', inviteCode, user.id);
      // navigate('/');
    }
  }, [user, game]);
  
  return (
    <main>
      <h1>You have been invited to join a game!</h1>
      <p>Please login to accept the invite.</p>
      <LoginContainerFactory />
      <button onClick={() => {
        dispatch('joinGame', inviteCode, user!.id);
      }}>Send join request</button>
    </main>
  );
}