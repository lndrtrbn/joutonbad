import { Outlet } from "react-router-dom";

import RootStyle from "./Root.style";
import Sidebar from "./Sidebar/Sidebar";
import { kcUserToUser } from "../../utils/user";
import useInterval from "../../hooks/useInterval";
import { useRefreshToken } from "../../http/useHttpAuth";
import { useAuthContext } from "../../contexts/auth.context";

export default function Root() {
  const { setUser } = useAuthContext();
  const { mutateAsync } = useRefreshToken();

  useInterval(async () => {
    const kcUser = await mutateAsync();
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
