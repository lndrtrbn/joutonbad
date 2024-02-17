import { Outlet } from "react-router-dom";
import { UIEvent, useState } from "react";

import MHeader from "./MHeader/MHeader";
import RootMobileStyle from "./MRoot.style";
import { kcUserToUser } from "../../../utils/user";
import MBottomMenu from "./MBottomMenu/MBottomMenu";
import useHttpAuth from "../../../http/useHttpAuth";
import useInterval from "../../../hooks/useInterval";
import { useAuthContext } from "../../../contexts/auth.context";

export default function RootMobile() {
  const {
    user: [user, setUser],
  } = useAuthContext();
  const [onTop, setOnTop] = useState(true);

  const { refreshToken } = useHttpAuth();

  useInterval(async () => {
    const kcUser = await refreshToken();
    setUser(kcUserToUser(kcUser));
  }, 30000);

  function scrolled(event: UIEvent<HTMLDivElement>) {
    setOnTop(event.currentTarget.scrollTop < 20);
  }

  return (
    <div className={RootMobileStyle.base}>
      {user && <MHeader onTop={onTop} />}

      <div className={RootMobileStyle.main} onScroll={scrolled}>
        <Outlet />
      </div>

      {user && <MBottomMenu />}
    </div>
  );
}
