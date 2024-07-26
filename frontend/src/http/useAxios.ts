import { useCallback, useMemo } from "react";
import axios, { AxiosResponse, isAxiosError } from "axios";

import { useAuthContext } from "../contexts/auth.context";
import { APIError, APIErrorMessage } from "../utils/error";
import { useAlertsContext } from "../contexts/alerts.context";

type AxiosRequest<T> = () => Promise<AxiosResponse<T, unknown>>;

export default function useAxios() {
  const {
    user: [user, setUser],
  } = useAuthContext();
  const { addAlert, addUnknownErrorAlert } = useAlertsContext();

  const headers = useMemo(
    () =>
      user && user.accessToken
        ? {
            Authorization: `Bearer ${user.accessToken}`,
          }
        : {},
    [user],
  );

  const call = useCallback(
    async <T>(request: AxiosRequest<T>) => {
      try {
        return (await request()).data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const apiError = new APIError(error.response.data);
          if (apiError.message === APIErrorMessage.UNAUTHORIZED) {
            setUser(undefined);
          } else if (apiError.statusCode === 500) {
            addUnknownErrorAlert();
          }
          throw apiError;
        } else {
          addUnknownErrorAlert();
          throw error;
        }
      }
    },
    [setUser, addUnknownErrorAlert],
  );

  const getAxios = useCallback(
    <T>(endpoint: string) =>
      call(() => axios.get<T>(endpoint, { headers })),
    [call, headers],
  );

  const postAxios = useCallback(
    <T>(endpoint: string, data: unknown) =>
      call(() => axios.post<T>(endpoint, data, { headers })),
    [call, headers],
  );

  const postFormAxios = useCallback(
    <T>(endpoint: string, data: unknown) =>
      call(() => axios.postForm<T>(endpoint, data, { headers })),
    [call, headers],
  );

  const patchAxios = useCallback(
    <T>(endpoint: string, data: unknown) =>
      call(() => axios.patch<T>(endpoint, data, { headers })),
    [call, headers],
  );

  const deleteAxios = useCallback(
    <T>(endpoint: string) =>
      call(() => axios.delete<T>(endpoint, { headers })),
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
