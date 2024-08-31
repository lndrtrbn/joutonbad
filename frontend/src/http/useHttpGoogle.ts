import { useMutation } from "@tanstack/react-query";

import useAxios from "./useAxios";
import { CONFIG } from "../config";

const ENDPOINT = `${CONFIG.joutonbad.apiUrl}/google`;

export default function useExportToGoogle() {
  const { postAxios } = useAxios();

  return useMutation({
    mutationFn: () => postAxios<void>(`${ENDPOINT}/export`, {}),
  });
}
