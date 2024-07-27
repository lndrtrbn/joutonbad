import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import {
  useQueryTournamentById,
  useUpdateTournament,
} from "../../http/useHttpTournament";
import Link from "../../components/Link/Link";
import Title from "../../components/Title/Title";
import Separator from "../../components/Separator/Separator";
import { useQueryAdminPlayers } from "../../http/useHttpPlayer";
import AdminTournamentPageStyle from "./AdminTournamentPage.style";
import FormTournament from "../AdminTournamentsPage/FormTournament/FormTournament";

export default function AdminTournamentPage() {
  const { id } = useParams();
  const { data: admins } = useQueryAdminPlayers();
  const { data: tournament } = useQueryTournamentById(id || "");
  const { mutateAsync, error, isPending } = useUpdateTournament(id || "");

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
        <section className="border border-black/10 p-6 rounded-xl max-w-[1040px]">
          <Title size="2xl">{tournament.name}</Title>
          <FormTournament
            players={admins ?? []}
            onSubmit={mutateAsync}
            error={error}
            tournament={tournament}
            loading={isPending}
          />
        </section>
      </div>
    </>
  );
}
