import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/auth.context";

type Props = {
  children: ReactNode;
};

/**
 * Check if there is user data in context.
 *
 * If data redirect to home page.
 * Otherwise continue the navigation.
 */
export default function UnauthGuard({ children }: Props) {
  const navigate = useNavigate();
  const {
    user: [user],
  } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return <>{!user ? children : null}</>;
}
