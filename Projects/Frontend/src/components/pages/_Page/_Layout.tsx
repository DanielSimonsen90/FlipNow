import Providers from "providers";
import Header from "components/shared/Header";
import { Outlet } from "react-router";

const Layout = () => (
  <Providers>
    <Header />
    <Outlet />
  </Providers>
);


export default Layout;