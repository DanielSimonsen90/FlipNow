import { useNavigate } from 'react-router';
import { SITE_NAME } from 'Constants';
import LoginContainer from '../LoginContainer';

export default function Header() {
  const navigate = useNavigate();
  
  return (
    <header className='site-header'>
      <h1 onClick={() => navigate('/')}>{SITE_NAME}</h1>
      <LoginContainer />
    </header>
  );
}