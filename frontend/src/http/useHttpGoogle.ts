import { useMutation } from "@tanstack/react-query";

import useAxios from "./useAxios";
import { API_URL } from "./config";

export default function useExportToGoogle() {
  const { postAxios } = useAxios();

  return useMutation({
    mutationFn: () => postAxios<void>(`${API_URL}/google/export`, {}),
  });
}
