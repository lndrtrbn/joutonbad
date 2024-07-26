import { useCallback, useMemo } from "react";

import useAxios from "./useAxios";
import { API_URL } from "./config";
import { Level } from "../utils/level";
import { Discipline } from "../utils/discipline";
import { Registration } from "../utils/registration";
import { useAuthContext } from "../contexts/auth.context";

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

export type UpdateRegistrationPayload = {
  sent?: boolean;
  cancelled?: string;
};

export default function useHttpRegistration() {
  const { user } = useAuthContext();
  const { getAxios, postAxios, patchAxios, deleteAxios } = useAxios();
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${user?.accessToken}`,
    }),
    [user],
  );

  const getAllRegistrations = useCallback(async () => {
    const endpoint = `${API_URL}/registration`;
    return getAxios<Registration[]>(endpoint, headers);
  }, [headers, getAxios]);

  const getRegistrationsByTournament = useCallback(
    async (id: string) => {
      const endpoint = `${API_URL}/registration/tournament/${id}`;
      return getAxios<Registration[]>(endpoint, headers);
    },
    [headers, getAxios],
  );

  const createRegistration = useCallback(
    async (payload: CreateRegistrationPayload) => {
      const endpoint = `${API_URL}/registration`;
      return postAxios<Registration>(endpoint, payload, headers);
    },
    [headers, postAxios],
  );

  const updateRegistration = useCallback(
    async (id: string, payload: UpdateRegistrationPayload) => {
      const endpoint = `${API_URL}/registration/${id}`;
      return patchAxios<Registration>(endpoint, payload, headers);
    },
    [headers, patchAxios],
  );

  const deleteRegistration = useCallback(
    async (id: string) => {
      const endpoint = `${API_URL}/registration/${id}`;
      return deleteAxios<Registration>(endpoint, headers);
    },
    [headers, deleteAxios],
  );

  return {
    getRegistrationsByTournament,
    getAllRegistrations,
    createRegistration,
    updateRegistration,
    deleteRegistration,
  };
}
