import useHttpAuth from "../http/useHttpAuth";
import useLazyFetch from "../http/useLazyFetch";

export default function useSignup() {
  const { signup } = useHttpAuth();
  const [call, , error, fetching, fetched] = useLazyFetch(signup);

  return [call, error, fetching, fetched] as const;
}
