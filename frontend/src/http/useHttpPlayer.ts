import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useAxios from "./useAxios";
import { Player } from "../utils/player";
import { Device } from "../utils/preferences";
import { useProfilContext } from "../contexts/profil.context";
import { useAlertsContext } from "../contexts/alerts.context";

import { CONFIG } from "../config";

const KEY = "players";
const ENDPOINT = `${CONFIG.joutonbad.apiUrl}/player`;

export function useQueryPlayers() {
  const { getAxios } = useAxios();

  return useQuery({
    queryKey: [KEY],
    queryFn: () => getAxios<Player[]>(ENDPOINT),
  });
}

export function useQueryAdminPlayers() {
  const { getAxios } = useAxios();

  return useQuery({
    queryKey: [KEY, "admins"],
    queryFn: () => getAxios<Player[]>(`${ENDPOINT}/admins`),
  });
}

export function useQueryPlayer(licence?: string) {
  const { getAxios } = useAxios();

  return useQuery({
    queryKey: [KEY, licence],
    queryFn: () => getAxios<Player>(`${ENDPOINT}/${licence}`),
    enabled: !!licence,
  });
}

export type CreatePlayerPayload = {
  name: string;
  lastname: string;
  license: string;
  club: string;
};

export function useCreatePlayer() {
  const { postAxios } = useAxios();
  const queryClient = useQueryClient();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: (payload: CreatePlayerPayload) =>
      postAxios<Player>(ENDPOINT, payload),
    onSuccess: () => {
      addSuccessAlert("Joueur enregistré");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export type UpdateProfilPayload = {
  favoriteDevice: Device;
  favoriteColor: string;
};

export function useUpdateProfil() {
  const { patchAxios } = useAxios();
  const queryClient = useQueryClient();
  const { setProfil } = useProfilContext();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: (payload: UpdateProfilPayload) =>
      patchAxios<Player>(`${ENDPOINT}/profil`, payload),
    onSuccess: (data) => {
      addSuccessAlert("Profil mis à jour");
      queryClient.invalidateQueries({ queryKey: [KEY] });
      setProfil(data);
    },
  });
}

export function useDeletePlayer() {
  const { deleteAxios } = useAxios();
  const queryClient = useQueryClient();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: (id: string) => deleteAxios<Player>(`${ENDPOINT}/${id}`),
    onSuccess: () => {
      addSuccessAlert("Joueur supprimé");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useUploadPlayers() {
  const { postFormAxios } = useAxios();
  const queryClient = useQueryClient();
  const { addSuccessAlert } = useAlertsContext();

  return useMutation({
    mutationFn: (file: File) => postFormAxios<Player[]>(`${ENDPOINT}/csv`, { file }),
    onSuccess: () => {
      addSuccessAlert("Import de joueurs lancé");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
}
