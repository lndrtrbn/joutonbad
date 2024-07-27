import { useMutation } from "@tanstack/react-query";

import useAxios from "./useAxios";
import { API_URL } from "./config";
import { KcUser } from "../utils/user";
import { useAuthContext } from "../contexts/auth.context";

export type LoginPayload = {
  username: string;
  password: string;
};

export function useSignin() {
  const { postAxios } = useAxios();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      postAxios<KcUser>(`${API_URL}/signin`, payload),
  });
}

export type SignupPayload = {
  email: string;
  username: string;
  password: string;
};

export function useSignup() {
  const { postAxios } = useAxios();

  return useMutation({
    mutationFn: (payload: SignupPayload) =>
      postAxios<void>(`${API_URL}/signup`, payload),
  });
}

export function useVerifyEmail() {
  const { postAxios } = useAxios();

  return useMutation({
    mutationFn: (email: string) =>
      postAxios<void>(`${API_URL}/verifyemail`, { email }),
  });
}

export function useForgotPwd() {
  const { postAxios } = useAxios();

  return useMutation({
    mutationFn: (email: string) =>
      postAxios<void>(`${API_URL}/forgotpwd`, { email }),
  });
}

export function useRefreshToken() {
  const { postAxios } = useAxios();
  const { user } = useAuthContext();
  const token = user?.refreshToken;

  return useMutation({
    mutationFn: () => postAxios<KcUser>(`${API_URL}/refreshtoken`, { token }),
  });
}
