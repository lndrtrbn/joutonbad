import useFetch from "../../../http/useFetch";
import Title from "../../../components/Title/Title";
import useHttpPlayer from "../../../http/useHttpPlayer";
import TournamentRow from "./TournamentRow/TournamentRow";
import FormTournament from "./FormTournament/FormTournament";
import Separator from "../../../components/Separator/Separator";
import useHttpTournament from "../../../http/useHttpTournament";
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
        <section className="flex-1 sm:border border-black/10 sm:p-6 rounded-2xl max-w-[1040px]">
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

        <section className="border border-black/10 p-6 rounded-2xl max-w-[1040px]">
          <Title size="2xl">Ajouter un tournoi</Title>
          <FormTournament
            players={admins ?? []}
            onSubmit={callCreate}
            error={createError}
            loading={createFetching}
          />
        </section>
      </div>
    </>
  );
}
