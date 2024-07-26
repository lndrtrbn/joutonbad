import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import useAxios from "./useAxios";
import { API_URL } from "./config";
import { Settings } from "../utils/settings";

const KEY = "settings";
const ENDPOINT = `${API_URL}/settings`;

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

  return useMutation({
    mutationFn: (payload: UpdateSettingsPayload) =>
      patchAxios<Settings>(ENDPOINT, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}
