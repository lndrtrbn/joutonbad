import { Outlet } from "react-router-dom";

import RootStyle from "./Root.style";
import Sidebar from "./Sidebar/Sidebar";
import { kcUserToUser } from "../../utils/user";
import useHttpAuth from "../../http/useHttpAuth";
import useInterval from "../../hooks/useInterval";
import { useAuthContext } from "../../contexts/auth.context";

export default function Root() {
  const { refreshToken } = useHttpAuth();
  const {
    user: [, setUser],
  } = useAuthContext();

  useInterval(async () => {
    const kcUser = await refreshToken();
    setUser(kcUserToUser(kcUser));
  }, 30000);

  return (
    <div className={RootStyle.base}>
      <Sidebar />

      <div className={RootStyle.main}>
        <Outlet />
      </div>
    </div>
  );
}
