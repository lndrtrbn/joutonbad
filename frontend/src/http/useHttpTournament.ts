import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useAxios from "./useAxios";
import { API_URL } from "./config";
import { Level } from "../utils/level";
import { Tournament } from "../utils/tournament";
import { Discipline } from "../utils/discipline";
import { useAuthContext } from "../contexts/auth.context";
import { useAlertsContext } from "../contexts/alerts.context";

export const KEY = "tournaments";
const ENDPOINT = `${API_URL}/tournament`;

export function useQueryTournamentById(id: string) {
  const { getAxios } = useAxios();

  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => getAxios<Tournament>(`${ENDPOINT}/${id}`),
  });
}

export function useQueryTournamentsByPlayer() {
  const { getAxios } = useAxios();
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [KEY, user?.license],
    queryFn: () => getAxios<Tournament[]>(`${ENDPOINT}/license/${user?.license}`),
  });
}

export function useQueryTournaments() {
  const { getAxios } = useAxios();

  return useQuery({
    queryKey: [KEY],
    queryFn: () => getAxios<Tournament[]>(ENDPOINT),
  });
}

export type TournamentPayload = {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  prices: number[];
  minLevel?: Level;
  maxLevel?: Level;
  disciplines?: Discipline[];
  freezed?: Discipline[];
  nocturne?: boolean;
};

export function useCreateTournament() {
  const { postAxios } = useAxios();
  const queryClient = useQueryClient();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: (payload: TournamentPayload) =>
      postAxios<Tournament>(ENDPOINT, payload),
    onSuccess: () => {
      addSuccessAlert("Tournoi enregistré");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useUpdateTournament(id: string) {
  const { patchAxios } = useAxios();
  const queryClient = useQueryClient();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: (payload: TournamentPayload) =>
      patchAxios<Tournament>(`${ENDPOINT}/${id}`, payload),
    onSuccess: () => {
      addSuccessAlert("Tournoi mis à jour");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useDeleteTournament() {
  const { deleteAxios } = useAxios();
  const queryClient = useQueryClient();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: (id: string) => deleteAxios<Tournament>(`${ENDPOINT}/${id}`),
    onSuccess: () => {
      addSuccessAlert("Tournoi supprimé");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
}
