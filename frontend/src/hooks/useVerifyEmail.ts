import useHttpAuth from "../http/useHttpAuth";
import useLazyFetch from "../http/useLazyFetch";

export default function useVerifyEmail() {
  const { verifyEmail } = useHttpAuth();
  const [call, , , fetching] = useLazyFetch(verifyEmail);

  function verify(email?: string) {
    if (email && !fetching) {
      call(email);
    }
  }

  return verify;
}
