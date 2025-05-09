import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useAxios from "./useAxios";
import { CONFIG } from "../config";
import { Settings } from "../utils/settings";
import { useAlertsContext } from "../contexts/alerts.context";

const KEY = "settings";
const ENDPOINT = `${CONFIG.joutonbad.apiUrl}/settings`;

export function useQuerySettings() {
  const { getAxios } = useAxios();

  return useQuery({
    queryKey: [KEY],
    queryFn: () => getAxios<Settings>(ENDPOINT),
  });
}

export type UpdateSettingsPayload = {
  clubPart: number;
};

export function useUpdateSettings() {
  const { patchAxios } = useAxios();
  const queryClient = useQueryClient();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: (payload: UpdateSettingsPayload) =>
      patchAxios<Settings>(ENDPOINT, payload),
    onSuccess: () => {
      addSuccessAlert("Paramètres mis à jour");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
}
