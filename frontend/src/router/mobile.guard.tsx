import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useDevice from "../hooks/useDevice";

type Props = {
  children: ReactNode;
};

/**
 * Check if the user is on a mobile.
 *
 * If not redirect to classic page.
 * Otherwise continue the navigation.
 */
export default function MobileGuard({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const device = useDevice();

  useEffect(() => {
    const isMobileUrl =
      location.pathname === "/m" ||
      location.pathname.startsWith("/m/");

    if (device === "mobile" && !isMobileUrl) {
      navigate(`/m${location.pathname}`);
    } else if (device === "desktop" && isMobileUrl) {
      navigate(location.pathname.substring(2));
    }
  }, [location, navigate, device]);

  return <>{children}</>;
}
