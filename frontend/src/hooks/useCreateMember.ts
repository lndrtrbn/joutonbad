import { useEffect, useRef } from "react";

import useLazyFetch from "../http/useLazyFetch";
import useHttpPlayer from "../http/useHttpPlayer";

export default function useCreateMember(onFetched: () => void) {
  const { createPlayer } = useHttpPlayer();
  const [call, , error, fetching, fetched] =
    useLazyFetch(createPlayer);

  const onFetchedCalled = useRef(false);

  useEffect(() => {
    if (fetched && !onFetchedCalled.current) {
      onFetched();
      onFetchedCalled.current = true;
    }
  }, [fetched, onFetched]);

  return [call, error, fetching] as const;
}
