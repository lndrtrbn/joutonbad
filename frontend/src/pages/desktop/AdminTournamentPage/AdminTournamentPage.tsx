import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import useFetch from "../../../http/useFetch";
import Link from "../../../components/Link/Link";
import Title from "../../../components/Title/Title";
import useHttpPlayer from "../../../http/useHttpPlayer";
import Separator from "../../../components/Separator/Separator";
import useHttpTournament from "../../../http/useHttpTournament";
import AdminTournamentPageStyle from "./AdminTournamentPage.style";
import useUpdateTournamenent from "../../../hooks/useUpdateTournament";
import FormTournament from "../AdminTournamentsPage/FormTournament/FormTournament";

export default function AdminTournamentPage() {
  const { id } = useParams();

  const { getTournamentById } = useHttpTournament();
  const [tournament, refetchTournament] = useFetch(() =>
    getTournamentById(id || ""),
  );

  const [callUpdate, updateError, updateFetching] =
    useUpdateTournamenent(id || "", refetchTournament);

  const { getAdminPlayers } = useHttpPlayer();
  const [admins] = useFetch(getAdminPlayers);

  if (!tournament) return null;

  return (
    <>
      <Title size="3xl">Edition d'un tournoi</Title>
      <Separator />

      <Link
        inline
        to="/admin/tournois"
        style="flex items-center gap-2 mb-4 w-[80px]"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Tournois
      </Link>

      <div className={AdminTournamentPageStyle.base}>
        <section className="border border-black/10 p-6 rounded-2xl max-w-[1040px]">
          <Title size="2xl">{tournament.name}</Title>
          <FormTournament
            players={admins ?? []}
            onSubmit={callUpdate}
            error={updateError}
            tournament={tournament}
            loading={updateFetching}
          />
        </section>
      </div>
    </>
  );
}
