import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { compareAsc, startOfDay, subDays } from "date-fns";

import useHttpRegistration, {
  CreateRegistrationPayload,
} from "../../../http/useHttpRegistration";
import useFetch from "../../../http/useFetch";
import { Discipline } from "../../../utils/discipline";
import TournamentPageStyle from "./TournamentPage.style";
import useHttpTournament from "../../../http/useHttpTournament";
import { useAuthContext } from "../../../contexts/auth.context";
import MTournamentDetails from "./MTournamentDetails/MTournamentDetails";
import MTournamentRegistrations from "./MTournamentRegistrations/MTournamentRegistrations";
import MFormRegistrationSingle from "../../../components/mobile/MFormRegistrationSingle/MFormRegistrationSingle";
import MFormRegistrationDouble from "../../../components/mobile/MFormRegistrationDouble/MFormRegistrationDouble";

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

  const registrationsDone = useMemo(() => {
    if (!tournament) return false;
    if (tournament.freezed) return true;
    const startDate = new Date(tournament.startDate);
    const twoWeeksAgo = startOfDay(subDays(startDate, 14));
    const today = startOfDay(new Date());
    return compareAsc(today, twoWeeksAgo) > 0;
  }, [tournament]);

  if (!tournament || !user) return null;

  async function register(payload: CreateRegistrationPayload) {
    try {
      await createRegistration(payload);
      refetchTournament();
    } catch (error) {
      // error instanceof APIError && setError({ [discipline]: error });
      console.error(error);
    }
  }

  return (
    <div className={TournamentPageStyle.base}>
      <MTournamentDetails tournament={tournament} />

      <MTournamentRegistrations
        style="pt-12 px-6"
        registrations={tournament.registrations}
      />

      {(tournament.disciplines.includes(Discipline.SH) ||
        tournament.disciplines.includes(Discipline.SD)) && (
        <MFormRegistrationSingle
          tournament={tournament}
          canRegister={!registrationsDone}
          style="pt-12 px-6"
          onSubmit={register}
        />
      )}

      {(tournament.disciplines.includes(Discipline.DH) ||
        tournament.disciplines.includes(Discipline.DD)) && (
        <MFormRegistrationDouble
          tournament={tournament}
          canRegister={!registrationsDone}
          style="pt-12 px-6"
          onSubmit={register}
        />
      )}

      {tournament.disciplines.includes(Discipline.DM) && (
        <MFormRegistrationDouble
          tournament={tournament}
          canRegister={!registrationsDone}
          style="pt-12 px-6"
          isMixte
          onSubmit={register}
        />
      )}
    </div>
  );
}
