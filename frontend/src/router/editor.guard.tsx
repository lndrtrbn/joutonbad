import { ReactNode, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import { isEditor } from "../utils/user";

type Props = {
  children: ReactNode;
};

/**
 * Check if the user as editor role.
 *
 * If not redirect to home page.
 * Otherwise continue the navigation.
 */
export default function EditorGuard({ children }: Props) {
  const { user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isEditor(user)) {
      navigate("/home");
    }
  }, [user, navigate]);

  return <>{user && isEditor(user) ? children : null}</>;
}
