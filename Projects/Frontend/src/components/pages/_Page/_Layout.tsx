import Header from "components/shared/Header";
import { Outlet } from "react-router";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);


export default Layout;