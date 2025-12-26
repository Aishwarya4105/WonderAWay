import { Outlet } from "react-router-dom";

const individualLayout = () => {
  return (
    <>
      {/* Agency dashboard should have its own navbar INSIDE AgencyDashboard */}
      <Outlet />
    </>
  );
};

export default individualLayout;