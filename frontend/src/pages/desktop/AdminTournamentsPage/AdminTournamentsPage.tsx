import useFetch from "../../../http/useFetch";
import Box from "../../../components/Box/Box";
import Title from "../../../components/Title/Title";
import useHttpPlayer from "../../../http/useHttpPlayer";
import FormTournament from "./FormTournament/FormTournament";
import Separator from "../../../components/Separator/Separator";
import useHttpTournament from "../../../http/useHttpTournament";
import TournamentsList from "./TournamentsList/TournamentsList";
import AdminTournamentsPageStyle from "./AdminTournamentsPage.style";
import useCreateTournamenent from "../../../hooks/useCreateTournament";

export default function AdminTournamentsPage() {
  const { getAllTournaments, deleteTournament } = useHttpTournament();
  const [tournaments, refetch] = useFetch(getAllTournaments);

  const [callCreate, createError, createFetching] =
    useCreateTournamenent(refetch);

  const { getAdminPlayers } = useHttpPlayer();
  const [admins] = useFetch(getAdminPlayers);

  if (!tournaments) return null;

  async function onDelete(id: string) {
    await deleteTournament(id);
    await refetch();
  }

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
            onDelete={onDelete}
          />
        </Box>

        <Box title="Ajouter un tournoi" style="max-w-[1100px]">
          <FormTournament
            players={admins ?? []}
            onSubmit={callCreate}
            error={createError}
            loading={createFetching}
          />
        </Box>
      </div>
    </>
  );
}
