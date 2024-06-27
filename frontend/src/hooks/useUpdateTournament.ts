import { useCallback, useState } from "react";

import useHttpTournament, {
  TournamentPayload,
} from "../http/useHttpTournament";
import useLazyFetch from "../http/useLazyFetch";

export default function useUpdateTournamenent(
  tournamentId: string,
  onFetched: () => Promise<unknown>,
) {
  const [fetching, setFetching] = useState(false);

  const { updateTournament } = useHttpTournament();
  const [fetch, , error] = useLazyFetch((p: TournamentPayload) =>
    updateTournament(tournamentId, p),
  );

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
