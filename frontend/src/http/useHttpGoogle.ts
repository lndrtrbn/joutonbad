import { useCallback } from "react";

import useAxios from "./useAxios";
import { API_URL } from "./config";
import { useAuthContext } from "../contexts/auth.context";

export default function useHttpGoogle() {
  const { postAxios } = useAxios();
  const {
    user: [user],
  } = useAuthContext();

  const exportData = useCallback(async () => {
    const endpoint = `${API_URL}/google/export`;
    const headers = {
      Authorization: `Bearer ${user?.accessToken}`,
    };
    return postAxios<void>(endpoint, {}, headers);
  }, [user, postAxios]);

  return { exportData };
}
