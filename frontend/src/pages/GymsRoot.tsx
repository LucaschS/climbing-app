import { Outlet } from "react-router-dom";

import GymsNavigation from "../components/GymsNavigation";

function GymsRootLayout() {
  return (
    <>
      <GymsNavigation />
      <Outlet />
    </>
  );
}

export default GymsRootLayout;
