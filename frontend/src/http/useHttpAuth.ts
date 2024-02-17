import { useCallback } from "react";

import useAxios from "./useAxios";
import { API_URL } from "./config";
import { KcUser } from "../utils/user";
import { useAuthContext } from "../contexts/auth.context";

export type LoginPayload = {
  username: string;
  password: string;
};

export type SignupPayload = {
  email: string;
  username: string;
  password: string;
};

export default function useHttpAuth() {
  const { postAxios } = useAxios();
  const {
    user: [user],
  } = useAuthContext();

  const login = useCallback(
    async (payload: LoginPayload) => {
      const endpoint = `${API_URL}/signin`;
      return postAxios<KcUser>(endpoint, payload);
    },
    [postAxios]
  );

  const refreshToken = useCallback(async () => {
    const endpoint = `${API_URL}/refreshtoken`;
    const token = user?.refreshToken;
    return postAxios<KcUser>(endpoint, { token });
  }, [user, postAxios]);

  const forgotPassword = useCallback(
    async (email: string) => {
      const endpoint = `${API_URL}/forgotpwd`;
      return postAxios<void>(endpoint, { email });
    },
    [postAxios]
  );

  const verifyEmail = useCallback(
    async (email: string) => {
      const endpoint = `${API_URL}/verifyemail`;
      return postAxios<void>(endpoint, { email });
    },
    [postAxios]
  );

  const signup = useCallback(
    async (payload: SignupPayload) => {
      const endpoint = `${API_URL}/signup`;
      return postAxios<void>(endpoint, payload);
    },
    [postAxios]
  );

  return { login, signup, refreshToken, forgotPassword, verifyEmail };
}
