import { Outlet } from "react-router-dom";

import RootStyle from "./Root.style";
import Sidebar from "./Sidebar/Sidebar";

export default function Root() {
  return (
    <div className={RootStyle.base}>
      <Sidebar />

      <div className={RootStyle.main}>
        <Outlet />
      </div>
    </div>
  );
}
