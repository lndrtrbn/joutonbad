import { useState } from "react";

import useHttpTournament, {
  TournamentPayload,
} from "../../../http/useHttpTournament";
import useFetch from "../../../http/useFetch";
import { APIError } from "../../../utils/error";
import Title from "../../../components/Title/Title";
import useHttpPlayer from "../../../http/useHttpPlayer";
import TournamentRow from "./TournamentRow/TournamentRow";
import FormTournament from "./FormTournament/FormTournament";
import Separator from "../../../components/Separator/Separator";
import AdminTournamentsPageStyle from "./AdminTournamentsPage.style";

export default function AdminTournamentsPage() {
  const { getAllTournaments, createTournament, deleteTournament } =
    useHttpTournament();
  const [tournaments, refetch] = useFetch(getAllTournaments);

  const { getAdminPlayers } = useHttpPlayer();
  const [admins] = useFetch(getAdminPlayers);

  const [submitError, setError] = useState<APIError>();

  if (!tournaments) return null;

  async function onSubmit(data: TournamentPayload) {
    try {
      await createTournament(data);
      refetch();
    } catch (error) {
      error instanceof APIError && setError(error);
    }
  }

  async function onDelete(id: string) {
    await deleteTournament(id);
    refetch();
  }

  return (
    <>
      <Title size="3xl">Gestion des tournois</Title>
      <Separator />

      <div className={AdminTournamentsPageStyle.base}>
        <section className="border border-black/10 p-6 rounded-2xl max-w-[1040px]">
          <Title size="2xl">Ajouter un tournoi</Title>
          <FormTournament
            players={admins ?? []}
            onSubmit={onSubmit}
            error={submitError}
          />
        </section>

        <section>
          <Title size="2xl">
            Tournois en ligne ({tournaments.length})
          </Title>
          <div className={AdminTournamentsPageStyle.list}>
            {tournaments
              .sort(
                (a, b) =>
                  new Date(a.startDate).getTime() -
                  new Date(b.startDate).getTime(),
              )
              .map((tournament, i) => (
                <TournamentRow
                  onDelete={onDelete}
                  tournament={tournament}
                  key={i}
                  alt={i % 2 == 0}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
