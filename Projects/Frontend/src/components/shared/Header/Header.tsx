import { useNavigate } from 'react-router';
import LoginContainer from '../LoginContainer';

export default function Header() {
  const navigate = useNavigate();
  
  return (
    <header className='site-header'>
      <h1 onClick={() => navigate('/')}>Danho's FlipNow Game</h1>
      <LoginContainer />
    </header>
  );
}