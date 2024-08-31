import { ComponentType } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import useLogin from "../hooks/useLogin";
import ScreenLoader from "../components/ScreenLoader/ScreenLoader";

type Props = {
  component: ComponentType;
};

/**
 * Check if there is user data in context.
 *
 * If not redirect to login page.
 * Otherwise continue the navigation.
 */
export default function AuthGuard({ component }: Props) {
  const { loginParams } = useLogin();

  const Component = withAuthenticationRequired(component, {
    loginOptions: loginParams,
    onRedirecting: () => <ScreenLoader />,
  });

  return <Component />;
}
