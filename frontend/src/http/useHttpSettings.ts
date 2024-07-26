import { useCallback, useMemo } from "react";

import useAxios from "./useAxios";
import { API_URL } from "./config";
import { Settings } from "../utils/settings";
import { useAuthContext } from "../contexts/auth.context";

export type UpdateSettingsPayload = {
  clubPart: number;
};

export default function useHttpSettings() {
  const { getAxios, patchAxios } = useAxios();
  const { user } = useAuthContext();

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${user?.accessToken}`,
    }),
    [user],
  );

  const getSettings = useCallback(async () => {
    const endpoint = `${API_URL}/settings`;
    return getAxios<Settings>(endpoint, headers);
  }, [headers, getAxios]);

  const updateSettings = useCallback(
    async (payload: UpdateSettingsPayload) => {
      const endpoint = `${API_URL}/settings`;
      return patchAxios<Settings>(endpoint, payload, headers);
    },
    [headers, patchAxios],
  );

  return {
    getSettings,
    updateSettings,
  };
}
