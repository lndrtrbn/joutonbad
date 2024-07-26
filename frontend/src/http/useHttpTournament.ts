import { useCallback, useMemo } from "react";

import useAxios from "./useAxios";
import { API_URL } from "./config";
import { Level } from "../utils/level";
import { Tournament } from "../utils/tournament";
import { Discipline } from "../utils/discipline";
import { useAuthContext } from "../contexts/auth.context";

export type TournamentPayload = {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  prices: number[];
  minLevel?: Level;
  maxLevel?: Level;
  disciplines?: Discipline[];
  freezed?: boolean;
  nocturne?: boolean;
};

export default function useHttpTournament() {
  const { getAxios, postAxios, deleteAxios, patchAxios } = useAxios();
  const { user } = useAuthContext();
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${user?.accessToken}`,
    }),
    [user],
  );

  const getTournamentById = useCallback(
    async (id: string) => {
      const endpoint = `${API_URL}/tournament/${id}`;
      return getAxios<Tournament>(endpoint, headers);
    },
    [headers, getAxios],
  );

  const getTournamentsByPlayer = useCallback(async () => {
    const endpoint = `${API_URL}/tournament/license/${user?.license}`;
    return getAxios<Tournament[]>(endpoint, headers);
  }, [headers, getAxios, user]);

  const getAllTournaments = useCallback(async () => {
    const endpoint = `${API_URL}/tournament`;
    return getAxios<Tournament[]>(endpoint, headers);
  }, [headers, getAxios]);

  const createTournament = useCallback(
    async (payload: TournamentPayload) => {
      const endpoint = `${API_URL}/tournament`;
      return postAxios<Tournament>(endpoint, payload, headers);
    },
    [headers, postAxios],
  );

  const updateTournament = useCallback(
    async (id: string, payload: TournamentPayload) => {
      const endpoint = `${API_URL}/tournament/${id}`;
      return patchAxios<Tournament>(endpoint, payload, headers);
    },
    [headers, patchAxios],
  );

  const deleteTournament = useCallback(
    async (id: string) => {
      const endpoint = `${API_URL}/tournament/${id}`;
      return deleteAxios<Tournament>(endpoint, headers);
    },
    [headers, deleteAxios],
  );

  return {
    getAllTournaments,
    createTournament,
    updateTournament,
    deleteTournament,
    getTournamentById,
    getTournamentsByPlayer,
  };
}
