import { useCallback, useEffect, useRef } from "react";

import useLazyFetch from "../http/useLazyFetch";
import useHttpPlayer, {
  CreatePlayerPayload,
} from "../http/useHttpPlayer";

export default function useCreateMember(onFetched: () => void) {
  const { createPlayer } = useHttpPlayer();
  const [fetch, , error, fetching, fetched] =
    useLazyFetch(createPlayer);

  const onFetchedCalled = useRef(false);

  const call = useCallback(
    (p: CreatePlayerPayload) => {
      onFetchedCalled.current = false;
      fetch(p);
    },
    [fetch],
  );

  useEffect(() => {
    if (fetched && !onFetchedCalled.current) {
      onFetched();
      onFetchedCalled.current = true;
    }
  }, [fetched, onFetched]);

  return [call, error, fetching] as const;
}
