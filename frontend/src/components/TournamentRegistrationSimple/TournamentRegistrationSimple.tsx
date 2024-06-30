import {
  RegistrationSingleInputs,
  Registration,
} from "../../utils/registration";
import Title from "../Title/Title";
import { Tournament } from "../../utils/tournament";
import { Discipline } from "../../utils/discipline";
import { CreateRegistrationPayload } from "../../http/useHttpRegistration";
import FormRegistrationSingle from "./FormRegistrationSingle/FormRegistrationSingle";

type Props = {
  tournament: Tournament;
  registrations: Registration[];
  playerLicense: string;
  canRegister: boolean;
  loading?: boolean;
  register: (data: CreateRegistrationPayload) => void;
};

export default function TournamentRegistrationSimple({
  tournament,
  registrations = [],
  canRegister,
  playerLicense,
  loading = false,
  register,
}: Props) {
  const registration = registrations.find(
    (reg) =>
      reg.player.license == playerLicense &&
      !reg.cancelled &&
      (reg.discipline == Discipline.SD ||
        reg.discipline == Discipline.SH),
  );

  function registerSimple(data: RegistrationSingleInputs) {
    if (data.discipline && data.rank) {
      const payload: CreateRegistrationPayload = {
        discipline: data.discipline,
        level: data.rank,
        tournamentId: tournament.id,
        playerLicense,
      };
      register(payload);
    }
  }

  if (!registration && !canRegister) return null;

  const disciplines = tournament.disciplines.filter(
    (d) => d === Discipline.SD || d === Discipline.SH,
  );

  return (
    <div>
      <Title size="2xl">Inscription en simple</Title>

      {!registration ? (
        <FormRegistrationSingle
          onSubmit={registerSimple}
          loading={loading}
          disciplines={disciplines}
        />
      ) : (
        <Title subtitle>Inscrit.e</Title>
      )}
    </div>
  );
}
