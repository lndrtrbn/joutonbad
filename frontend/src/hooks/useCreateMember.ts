import { useCallback, useState } from "react";

import useLazyFetch from "../http/useLazyFetch";
import useHttpPlayer, {
  CreatePlayerPayload,
} from "../http/useHttpPlayer";

export default function useCreateMember(
  onFetched: () => Promise<unknown>,
) {
  const [fetching, setFetching] = useState(false);

  const { createPlayer } = useHttpPlayer();
  const [fetch, , error] = useLazyFetch(createPlayer);

  const call = useCallback(
    async (p: CreatePlayerPayload) => {
      setFetching(true);
      await fetch(p);
      await onFetched();
      setFetching(false);
    },
    [fetch, onFetched],
  );

  return [call, error, fetching] as const;
}
