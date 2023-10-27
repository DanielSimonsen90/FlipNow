import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Invite } from 'components/pages';
import { Layout } from 'components/pages/_Page';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" Component={Layout}>
        <Route index element={<Home />} />
        <Route path="invite/:inviteCode" element={<Invite />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;