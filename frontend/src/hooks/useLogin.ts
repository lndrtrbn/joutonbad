import { useAuth0 } from "@auth0/auth0-react";

export default function useLogin() {
  const callbackUrl = `${window.location.origin}/callback`;
  const { loginWithRedirect, logout: logoutAuth0 } = useAuth0();

  const loginParams = {
    authorizationParams: {
      redirect_uri: callbackUrl,
    },
  };

  const logoutParams = {
    logoutParams: {
      returnTo: window.location.origin,
    },
  };

  const signupParams = {
    authorizationParams: {
      redirect_uri: callbackUrl,
      screen_hint: "signup",
    },
  };

  async function login() {
    await loginWithRedirect(loginParams);
  }

  async function signup() {
    await loginWithRedirect(signupParams);
  }

  function logout() {
    logoutAuth0(logoutParams);
  }

  return {
    loginParams,
    logoutParams,
    signupParams,
    login,
    signup,
    logout,
  };
}
