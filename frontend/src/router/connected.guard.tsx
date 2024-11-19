import { ReactNode, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

/**
 * Check if the user as editor role.
 *
 * If not redirect to home page.
 * Otherwise continue the navigation.
 */
export default function ConnectedGuard({ children }: Props) {
  const { user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return <>{!user ? children : null}</>;
}
