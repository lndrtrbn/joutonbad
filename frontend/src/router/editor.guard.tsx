import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isEditor } from "../utils/user";
import { useAuthContext } from "../contexts/auth.context";

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
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user || !isEditor(user)) {
      navigate("/");
    }
  }, [user, navigate]);

  return <>{user && isEditor(user) ? children : null}</>;
}
