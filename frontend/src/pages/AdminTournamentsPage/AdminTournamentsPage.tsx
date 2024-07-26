import {
  useCreateTournament,
  useDeleteTournament,
  useQueryTournaments,
} from "../../http/useHttpTournament";
import Box from "../../components/Box/Box";
import Title from "../../components/Title/Title";
import FormTournament from "./FormTournament/FormTournament";
import Separator from "../../components/Separator/Separator";
import TournamentsList from "./TournamentsList/TournamentsList";
import { useQueryAdminPlayers } from "../../http/useHttpPlayer";
import AdminTournamentsPageStyle from "./AdminTournamentsPage.style";

export default function AdminTournamentsPage() {
  const { data: admins } = useQueryAdminPlayers();
  const { data: tournaments } = useQueryTournaments();
  const { mutateAsync: deleteTournament } = useDeleteTournament();
  const { mutateAsync, error, isPending } = useCreateTournament();

  if (!tournaments) return null;

  return (
    <>
      <Title size="3xl">Gestion des tournois</Title>
      <Separator />

      <div className={AdminTournamentsPageStyle.base}>
        <Box
          title={`Tournois en ligne (${tournaments.length})`}
          mobileFull
          style="max-w-[1100px]"
        >
          <TournamentsList
            tournaments={tournaments}
            onDelete={deleteTournament}
          />
        </Box>

        <Box title="Ajouter un tournoi" style="max-w-[1100px]">
          <FormTournament
            players={admins ?? []}
            onSubmit={mutateAsync}
            error={error}
            loading={isPending}
          />
        </Box>
      </div>
    </>
  );
}
