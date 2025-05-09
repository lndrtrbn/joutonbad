import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useAxios from "./useAxios";
import { Level } from "../utils/level";
import { Discipline } from "../utils/discipline";
import { Registration } from "../utils/registration";
import { KEY as TOURNAMENT_KEY } from "./useHttpTournament";
import { useAlertsContext } from "../contexts/alerts.context";
import { CONFIG } from "../config";

const KEY = "registrations";
const ENDPOINT = `${CONFIG.joutonbad.apiUrl}/registration`;

export function useQueryRegistrations() {
  const { getAxios } = useAxios();

  return useQuery({
    queryKey: [KEY],
    queryFn: () => getAxios<Registration[]>(ENDPOINT),
  });
}

export function useQueryRegistrationsByTournament(id: string) {
  const { getAxios } = useAxios();

  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => getAxios<Registration[]>(`${ENDPOINT}/tournament/${id}`),
  });
}

export type CreateRegistrationPayload = {
  discipline: Discipline;
  level: Level;
  tournamentId: string;
  playerLicense: string;
  registerPartner?: boolean;
  partner?: {
    name: string;
    lastname: string;
    license: string;
    club: string;
    level: Level;
  };
};

export function useCreateRegistration() {
  const { postAxios } = useAxios();
  const queryClient = useQueryClient();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: (payload: CreateRegistrationPayload) =>
      postAxios<Registration>(ENDPOINT, payload),
    onSuccess: () => {
      addSuccessAlert("Inscription enregistrée");
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [TOURNAMENT_KEY] });
    },
  });
}

export type UpdateRegistrationPayload = {
  sent?: boolean;
  cancelled?: string;
};

export function useUpdateRegistration() {
  const { patchAxios } = useAxios();
  const queryClient = useQueryClient();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateRegistrationPayload;
    }) => patchAxios<Registration>(`${ENDPOINT}/${id}`, payload),
    onSuccess: () => {
      addSuccessAlert("Inscription mise à jour");
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [TOURNAMENT_KEY] });
    },
  });
}

export function useDeleteRegistration() {
  const { deleteAxios } = useAxios();
  const queryClient = useQueryClient();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: (id: string) => deleteAxios<Registration>(`${ENDPOINT}/${id}`),
    onSuccess: () => {
      addSuccessAlert("Inscription supprimée");
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [TOURNAMENT_KEY] });
    },
  });
}
