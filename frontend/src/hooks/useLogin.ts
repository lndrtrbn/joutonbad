import { useEffect } from "react";

import { kcUserToUser } from "../utils/user";
import useHttpAuth from "../http/useHttpAuth";
import useLazyFetch from "../http/useLazyFetch";
import { useAuthContext } from "../contexts/auth.context";

export default function useLogin() {
  const { login } = useHttpAuth();
  const [call, data, error, fetching] = useLazyFetch(login);
  const {
    user: [, setUser],
  } = useAuthContext();

  useEffect(() => {
    if (data) {
      const userData = kcUserToUser(data);
      setUser(userData);
    }
  }, [data, setUser]);

  return [call, error, fetching] as const;
}
