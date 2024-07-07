import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { compareAsc, startOfDay, subDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import useFetch from "../../http/useFetch";
import Link from "../../components/Link/Link";
import Title from "../../components/Title/Title";
import MembersList from "./MembersList/MembersList";
import { Discipline } from "../../utils/discipline";
import useHttpTournament from "../../http/useHttpTournament";
import { useAuthContext } from "../../contexts/auth.context";
import Separator from "../../components/Separator/Separator";
import TournamentDetails from "./TournamentDetails/TournamentDetails";
import useCreateRegistration from "../../hooks/useCreateRegistration";
import RegistrationDouble from "../../components/RegistrationDouble/RegistrationDouble";
import TournamentRegistrationSimple from "../../components/TournamentRegistrationSimple/TournamentRegistrationSimple";

export default function TournamentPage() {
  const {
    user: [user],
  } = useAuthContext();

  const { id } = useParams();
  const { getTournamentById } = useHttpTournament();
  const [tournament, refetchTournament] = useFetch(() =>
    getTournamentById(id || ""),
  );

  const [callCreateSimple, , createSimpleFetching] =
    useCreateRegistration(refetchTournament);
  const [callCreateDouble, createDoubleError, createDoubleFetching] =
    useCreateRegistration(refetchTournament);
  const [callCreateMixte, createMixteError, createMixteFetching] =
    useCreateRegistration(refetchTournament);

  const registrationsDone = useMemo(() => {
    if (!tournament) return false;
    if (tournament.freezed) return true;
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

      <Link
        inline
        to="/"
        style="flex items-center gap-2 mb-4 w-[100px]"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Calendrier
      </Link>

      <TournamentDetails tournament={tournament} />

      <div className="flex flex-wrap items-start gap-8 mt-8 max-w-[1140px]">
        <section className="flex-1 border border-black/10 p-6 rounded-2xl flex flex-col gap-8">
          {registrationsDone && <p>Aucune inscription possible</p>}

          {(tournament.disciplines.includes(Discipline.SH) ||
            tournament.disciplines.includes(Discipline.SD)) && (
            <TournamentRegistrationSimple
              tournament={tournament}
              registrations={tournament.registrations}
              canRegister={!registrationsDone}
              playerLicense={user?.license}
              register={callCreateSimple}
              loading={createSimpleFetching}
            />
          )}

          {(tournament.disciplines.includes(Discipline.DH) ||
            tournament.disciplines.includes(Discipline.DD)) && (
            <RegistrationDouble
              discipline={Discipline.DH}
              registrations={tournament.registrations}
              playerLicense={user?.license}
              canRegister={!registrationsDone}
              register={callCreateDouble}
              loading={createDoubleFetching}
              tournament={tournament}
              error={createDoubleError}
            />
          )}

          {tournament.disciplines.includes(Discipline.DM) && (
            <RegistrationDouble
              discipline={Discipline.DM}
              registrations={tournament.registrations}
              playerLicense={user?.license}
              canRegister={!registrationsDone}
              register={callCreateMixte}
              loading={createMixteFetching}
              tournament={tournament}
              error={createMixteError}
            />
          )}
        </section>

        <section className="border border-black/10 p-6 rounded-2xl w-full sm:w-[300px]">
          <MembersList registrations={tournament.registrations} />
        </section>
      </div>
    </>
  );
}
