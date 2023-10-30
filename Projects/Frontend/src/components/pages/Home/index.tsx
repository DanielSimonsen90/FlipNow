import GameProvider from 'providers/GameProvider';
import Page from '../_Page'
import Home from './Home';

export default function HomePage() {
  return (
    <Page description='Flip those cards with friends!'>
      <GameProvider>
        <Home />
      </GameProvider>
    </Page>
  )
}