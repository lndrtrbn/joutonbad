import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/auth.context";

type Props = {
  children: ReactNode;
};

/**
 * Check if there is user data in context.
 *
 * If not redirect to login page.
 * Otherwise continue the navigation.
 */
export default function AuthGuard({ children }: Props) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <>{user ? children : null}</>;
}
