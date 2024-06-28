import { useCallback, useState } from "react";

import useHttpRegistration, {
  CreateRegistrationPayload,
} from "../http/useHttpRegistration";
import useLazyFetch from "../http/useLazyFetch";

export default function useCreateRegistration(
  onFetched: () => Promise<unknown>,
) {
  const [fetching, setFetching] = useState(false);

  const { createRegistration } = useHttpRegistration();
  const [fetch, , error] = useLazyFetch(createRegistration);

  const call = useCallback(
    async (p: CreateRegistrationPayload) => {
      setFetching(true);
      await fetch(p);
      await onFetched();
      setFetching(false);
    },
    [fetch, onFetched],
  );

  return [call, error, fetching] as const;
}
