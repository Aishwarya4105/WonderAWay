import { Outlet } from "react-router-dom";

const AgencyLayout = () => {
  return (
    <>
      {/* Agency dashboard should have its own navbar INSIDE AgencyDashboard */}
      <Outlet />
    </>
  );
};

export default AgencyLayout;