import { useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosResponse, isAxiosError } from "axios";

import { APIError } from "../utils/error";
import { useAlertsContext } from "../contexts/alerts.context";

type AxiosRequest<T> = () => Promise<AxiosResponse<T, unknown>>;

export default function useAxios() {
  const { getAccessTokenSilently } = useAuth0();
  const { addUnknownErrorAlert } = useAlertsContext();

  const headers = useCallback(
    async () => ({
      Authorization: `Bearer ${await getAccessTokenSilently()}`,
    }),
    [getAccessTokenSilently],
  );

  const call = useCallback(
    async <T>(request: AxiosRequest<T>) => {
      try {
        return (await request()).data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const apiError = new APIError(error.response.data);
          if (apiError.statusCode === 500) {
            addUnknownErrorAlert();
          }
          throw apiError;
        } else {
          addUnknownErrorAlert();
          throw error;
        }
      }
    },
    [addUnknownErrorAlert],
  );

  const getAxios = useCallback(
    <T>(endpoint: string) =>
      call(async () => axios.get<T>(endpoint, { headers: await headers() })),
    [call, headers],
  );

  const postAxios = useCallback(
    <T>(endpoint: string, data: unknown) =>
      call(async () => axios.post<T>(endpoint, data, { headers: await headers() })),
    [call, headers],
  );

  const postFormAxios = useCallback(
    <T>(endpoint: string, data: unknown) =>
      call(async () =>
        axios.postForm<T>(endpoint, data, { headers: await headers() }),
      ),
    [call, headers],
  );

  const patchAxios = useCallback(
    <T>(endpoint: string, data: unknown) =>
      call(async () => axios.patch<T>(endpoint, data, { headers: await headers() })),
    [call, headers],
  );

  const deleteAxios = useCallback(
    <T>(endpoint: string) =>
      call(async () => axios.delete<T>(endpoint, { headers: await headers() })),
    [call, headers],
  );

  return {
    getAxios,
    postAxios,
    postFormAxios,
    patchAxios,
    deleteAxios,
  };
}
