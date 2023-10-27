import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <header>
        <ModCheck />
        <h1>404 Not Found</h1>
        <ModCheck />
      </header>
      <p>The page you are looking for does not exist.</p>
      <Link className='button' to="../">Come back to safety</Link>
    </div>
  );
}

function ModCheck() {
  return (
    <img className='modCheck' src="https://cdn.discordapp.com/emojis/988549127866568744.gif?size=160&quality=lossless" alt="Spongebob fish can't find your page" />
  );
}