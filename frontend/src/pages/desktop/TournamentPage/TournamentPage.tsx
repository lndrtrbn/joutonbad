import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { compareAsc, startOfDay, subDays } from "date-fns";

import useHttpRegistration, {
  CreateRegistrationPayload,
} from "../../../http/useHttpRegistration";
import useFetch from "../../../http/useFetch";
import { APIError } from "../../../utils/error";
import MembersList from "./MembersList/MembersList";
import { Discipline } from "../../../utils/discipline";
import TournamentPageStyle from "./TournamentPage.style";
import useHttpTournament from "../../../http/useHttpTournament";
import { useAuthContext } from "../../../contexts/auth.context";
import Separator from "../../../components/Separator/Separator";
import TournamentDetails from "./TournamentDetails/TournamentDetails";
import RegistrationDouble from "../../../components/RegistrationDouble/RegistrationDouble";
import TournamentRegistrationSimple from "../../../components/TournamentRegistrationSimple/TournamentRegistrationSimple";

export default function TournamentPage() {
  const {
    user: [user],
  } = useAuthContext();

  const { id } = useParams();
  const { getTournamentById } = useHttpTournament();
  const { createRegistration } = useHttpRegistration();
  const [tournament, refetchTournament] = useFetch(() =>
    getTournamentById(id || ""),
  );

  const [submitError, setError] = useState<{
    [key: string]: APIError;
  }>();

  const registrationsDone = useMemo(() => {
    if (!tournament) return false;
    if (tournament.freezed) return true;
    const startDate = new Date(tournament.startDate);
    const twoWeeksAgo = startOfDay(subDays(startDate, 14));
    const today = startOfDay(new Date());
    return compareAsc(today, twoWeeksAgo) > 0;
  }, [tournament]);

  async function register(
    discipline: Discipline,
    payload: CreateRegistrationPayload,
  ) {
    try {
      setError(undefined);
      await createRegistration(payload);
      refetchTournament();
    } catch (error) {
      error instanceof APIError && setError({ [discipline]: error });
    }
  }

  if (!tournament || !user) return null;

  return (
    <div className={TournamentPageStyle.container}>
      <div className={TournamentPageStyle.tournament}>
        <TournamentDetails tournament={tournament} />

        <Separator />

        {(tournament.disciplines.includes(Discipline.SH) ||
          tournament.disciplines.includes(Discipline.SD)) && (
          <TournamentRegistrationSimple
            tournamentId={id || ""}
            registrations={tournament.registrations}
            canRegister={!registrationsDone}
            playerLicense={user?.license}
            register={(data) => register(Discipline.SH, data)}
          />
        )}

        {(tournament.disciplines.includes(Discipline.DH) ||
          tournament.disciplines.includes(Discipline.DD)) && (
          <RegistrationDouble
            discipline={Discipline.DH}
            registrations={tournament.registrations}
            playerLicense={user?.license}
            canRegister={!registrationsDone}
            register={(data) => register(Discipline.DH, data)}
            tournamentId={id || ""}
            error={submitError?.[Discipline.DH]}
          />
        )}

        {tournament.disciplines.includes(Discipline.DM) && (
          <RegistrationDouble
            discipline={Discipline.DM}
            registrations={tournament.registrations}
            playerLicense={user?.license}
            canRegister={!registrationsDone}
            register={(data) => register(Discipline.DM, data)}
            tournamentId={id || ""}
            error={submitError?.[Discipline.DM]}
          />
        )}
      </div>

      <div className={TournamentPageStyle.club}>
        <MembersList registrations={tournament.registrations} />
      </div>
    </div>
  );
}
