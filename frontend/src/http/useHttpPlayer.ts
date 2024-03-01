import { useCallback, useMemo } from "react";

import useAxios from "./useAxios";
import { API_URL } from "./config";
import { Player } from "../utils/player";
import { Device } from "../utils/preferences";
import { useAuthContext } from "../contexts/auth.context";

export type CreatePlayerPayload = {
  name: string;
  lastname: string;
  license: string;
  club: string;
};

export type UpdateProfilPayload = {
  favoriteDevice: Device;
  favoriteColor: string;
};

export default function useHttpPlayer() {
  const {
    getAxios,
    postAxios,
    postFormAxios,
    deleteAxios,
    patchAxios,
  } = useAxios();
  const {
    user: [user],
  } = useAuthContext();

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${user?.accessToken}`,
    }),
    [user],
  );

  const getAllPlayers = useCallback(async () => {
    const endpoint = `${API_URL}/player`;
    return getAxios<Player[]>(endpoint, headers);
  }, [headers, getAxios]);

  const getPlayer = useCallback(
    async (licence: string) => {
      const endpoint = `${API_URL}/player/${licence}`;
      return getAxios<Player>(endpoint, headers);
    },
    [headers, getAxios],
  );

  const getAdminPlayers = useCallback(async () => {
    const endpoint = `${API_URL}/player/admins`;
    return getAxios<Player[]>(endpoint, headers);
  }, [headers, getAxios]);

  const createPlayer = useCallback(
    async (payload: CreatePlayerPayload) => {
      const endpoint = `${API_URL}/player`;
      return postAxios<Player>(endpoint, payload, headers);
    },
    [headers, postAxios],
  );

  const updateProfil = useCallback(
    async (payload: UpdateProfilPayload) => {
      const endpoint = `${API_URL}/player/profil`;
      return patchAxios<Player>(endpoint, payload, headers);
    },
    [headers, patchAxios],
  );

  const uploadPlayers = useCallback(
    async (file: File) => {
      const endpoint = `${API_URL}/player/csv`;
      return postFormAxios<Player[]>(endpoint, { file }, headers);
    },
    [headers, postFormAxios],
  );

  const deletePlayer = useCallback(
    async (id: string) => {
      const endpoint = `${API_URL}/player/${id}`;
      return deleteAxios<Player>(endpoint, headers);
    },
    [headers, deleteAxios],
  );

  return {
    getPlayer,
    getAllPlayers,
    getAdminPlayers,
    createPlayer,
    updateProfil,
    deletePlayer,
    uploadPlayers,
  };
}
