import { useCallback, useState } from "react";

import useHttpTournament, {
  TournamentPayload,
} from "../http/useHttpTournament";
import useLazyFetch from "../http/useLazyFetch";

export default function useCreateTournamenent(
  onFetched: () => Promise<unknown>,
) {
  const [fetching, setFetching] = useState(false);

  const { createTournament } = useHttpTournament();
  const [fetch, , error] = useLazyFetch(createTournament);

  const call = useCallback(
    async (p: TournamentPayload) => {
      setFetching(true);
      await fetch(p);
      await onFetched();
      setFetching(false);
    },
    [fetch, onFetched],
  );

  return [call, error, fetching] as const;
}
