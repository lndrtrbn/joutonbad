import { useState } from "react";
import { useParams } from "react-router-dom";

import useHttpTournament, {
  TournamentPayload,
} from "../../../http/useHttpTournament";
import useFetch from "../../../http/useFetch";
import { APIError } from "../../../utils/error";
import Title from "../../../components/Title/Title";
import useHttpPlayer from "../../../http/useHttpPlayer";
import { useAlertsContext } from "../../../contexts/alerts.context";
import AdminTournamentPageStyle from "./AdminTournamentPage.style";
import FormTournament from "../AdminTournamentsPage/FormTournament/FormTournament";

export default function AdminTournamentPage() {
  const { id } = useParams();
  const { addAlert } = useAlertsContext();

  const { getTournamentById, updateTournament } = useHttpTournament();
  const [tournament, refetchTournament] = useFetch(() =>
    getTournamentById(id || "")
  );

  const { getAdminPlayers } = useHttpPlayer();
  const [admins] = useFetch(getAdminPlayers);

  const [submitError, setError] = useState<APIError>();

  if (!tournament) return null;

  async function onSubmit(data: TournamentPayload) {
    if (tournament) {
      try {
        await updateTournament(tournament?.id, data);
        refetchTournament();
        addAlert({
          type: "success",
          message: "Le tournoi a bien été mis à jour",
        });
      } catch (error) {
        error instanceof APIError && setError(error);
      }
    }
  }

  return (
    <div className={AdminTournamentPageStyle.base}>
      <section>
        <Title size="2xl">Edition d'un tournoi</Title>
        <FormTournament
          players={admins ?? []}
          onSubmit={onSubmit}
          error={submitError}
          tournament={tournament}
        />
      </section>
    </div>
  );
}
