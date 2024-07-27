import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { compareAsc, startOfDay, subDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Link from "../../components/Link/Link";
import Title from "../../components/Title/Title";
import MembersList from "./MembersList/MembersList";
import { Discipline } from "../../utils/discipline";
import { useAuthContext } from "../../contexts/auth.context";
import Separator from "../../components/Separator/Separator";
import { useQueryTournamentById } from "../../http/useHttpTournament";
import TournamentDetails from "./TournamentDetails/TournamentDetails";
import RegistrationDouble from "../../components/RegistrationDouble/RegistrationDouble";
import TournamentRegistrationSimple from "../../components/TournamentRegistrationSimple/TournamentRegistrationSimple";

export default function TournamentPage() {
  const { user } = useAuthContext();

  const { id } = useParams();
  const { data: tournament } = useQueryTournamentById(id || "");

  const registrationsDone = useMemo(() => {
    if (!tournament) return false;
    const startDate = new Date(tournament.startDate);
    const twoWeeksAgo = startOfDay(subDays(startDate, 14));
    const today = startOfDay(new Date());
    return compareAsc(today, twoWeeksAgo) > 0;
  }, [tournament]);

  if (!tournament || !user) return null;

  return (
    <>
      <Title size="3xl">{tournament.name}</Title>
      <Separator />

      <Link inline to="/" style="flex items-center gap-2 mb-4 w-[100px]">
        <FontAwesomeIcon icon={faChevronLeft} />
        Calendrier
      </Link>

      <TournamentDetails tournament={tournament} />

      <div className="flex flex-wrap items-start gap-8 mt-8 max-w-[1140px]">
        <section className="flex-1 border border-black/10 p-6 rounded-xl flex flex-col gap-8">
          {registrationsDone && <p>Aucune inscription possible</p>}

          {(tournament.disciplines.includes(Discipline.SH) ||
            tournament.disciplines.includes(Discipline.SD)) && (
            <TournamentRegistrationSimple
              tournament={tournament}
              canRegister={!registrationsDone}
              playerLicense={user?.license}
            />
          )}

          {(tournament.disciplines.includes(Discipline.DH) ||
            tournament.disciplines.includes(Discipline.DD)) && (
            <RegistrationDouble
              discipline={Discipline.DH}
              tournament={tournament}
              canRegister={!registrationsDone}
              playerLicense={user?.license}
            />
          )}

          {tournament.disciplines.includes(Discipline.DM) && (
            <RegistrationDouble
              discipline={Discipline.DM}
              tournament={tournament}
              canRegister={!registrationsDone}
              playerLicense={user?.license}
            />
          )}
        </section>

        <section className="border border-black/10 p-6 rounded-xl w-full sm:w-[300px]">
          <MembersList registrations={tournament.registrations} />
        </section>
      </div>
    </>
  );
}
