import Header from "../Homepage/home-header";
import Footer from "../Homepage/home-footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;