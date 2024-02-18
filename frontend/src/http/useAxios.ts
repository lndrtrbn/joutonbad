import axios, {
  RawAxiosRequestHeaders,
  AxiosResponse,
  isAxiosError,
} from "axios";
import { useCallback } from "react";

import { useAuthContext } from "../contexts/auth.context";
import { APIError, APIErrorMessage } from "../utils/error";
import { useAlertsContext } from "../contexts/alerts.context";

type AxiosRequest<T> = () => Promise<AxiosResponse<T, unknown>>;

export default function useAxios() {
  const {
    user: [, setUser],
  } = useAuthContext();
  const { addAlert } = useAlertsContext();

  const call = useCallback(
    async <T>(request: AxiosRequest<T>) => {
      try {
        return (await request()).data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const apiError = new APIError(error.response.data);
          if (apiError.message === APIErrorMessage.UNAUTHORIZED) {
            addAlert({
              type: "error",
              message: "Tu sembles ne pas être connecté.e",
            });
            setUser(undefined);
          }
          throw apiError;
        } else {
          addAlert({
            type: "warning",
            message:
              "Une erreur inconnue est survenue. Si elle t'empêche d'utiliser l'application correctement contacte un.e responsable",
          });
          throw error;
        }
      }
    },
    [setUser, addAlert],
  );

  const getAxios = useCallback(
    <T>(endpoint: string, headers?: RawAxiosRequestHeaders) =>
      call(() => axios.get<T>(endpoint, { headers })),
    [call],
  );

  const postAxios = useCallback(
    <T>(
      endpoint: string,
      data: unknown,
      headers?: RawAxiosRequestHeaders,
    ) => call(() => axios.post<T>(endpoint, data, { headers })),
    [call],
  );

  const postFormAxios = useCallback(
    <T>(
      endpoint: string,
      data: unknown,
      headers?: RawAxiosRequestHeaders,
    ) => call(() => axios.postForm<T>(endpoint, data, { headers })),
    [call],
  );

  const patchAxios = useCallback(
    <T>(
      endpoint: string,
      data: unknown,
      headers?: RawAxiosRequestHeaders,
    ) => call(() => axios.patch<T>(endpoint, data, { headers })),
    [call],
  );

  const deleteAxios = useCallback(
    <T>(endpoint: string, headers?: RawAxiosRequestHeaders) =>
      call(() => axios.delete<T>(endpoint, { headers })),
    [call],
  );

  return {
    getAxios,
    postAxios,
    postFormAxios,
    patchAxios,
    deleteAxios,
  };
}
