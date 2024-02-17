import useHttpAuth from "../http/useHttpAuth";
import useLazyFetch from "../http/useLazyFetch";

export default function useForgotPwd() {
  const { forgotPassword } = useHttpAuth();
  const [call, , , fetching, fetched] = useLazyFetch(forgotPassword);

  return [call, fetching, fetched] as const;
}
