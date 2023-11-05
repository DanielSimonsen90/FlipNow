import { Outlet } from "react-router";

import Providers from "providers";
import Header from "components/shared/Header";
import Footer from "components/shared/Footer";

const Layout = () => (
  <Providers>
    <Header />
    <Outlet />
    <Footer />
  </Providers>
);


export default Layout;