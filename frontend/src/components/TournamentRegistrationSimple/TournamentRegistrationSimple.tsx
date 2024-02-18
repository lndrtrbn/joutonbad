import {
  RegistrationSingleInputs,
  Registration,
} from "../../utils/registration";
import Title from "../Title/Title";
import { Discipline } from "../../utils/discipline";
import { CreateRegistrationPayload } from "../../http/useHttpRegistration";
import FormRegistrationSingle from "./FormRegistrationSingle/FormRegistrationSingle";
import TournamentRegistrationSimpleStyle from "./TournamentRegistrationSimple.style";

type Props = {
  tournamentId: string;
  registrations: Registration[];
  playerLicense: string;
  canRegister: boolean;
  register: (data: CreateRegistrationPayload) => void;
};

export default function TournamentRegistrationSimple({
  tournamentId,
  registrations = [],
  canRegister,
  playerLicense,
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
        tournamentId,
        playerLicense,
      };
      register(payload);
    }
  }

  if (!registration && !canRegister) return null;

  return (
    <div className={TournamentRegistrationSimpleStyle.base}>
      <Title size="2xl">Tableau de Simple</Title>

      {!registration ? (
        <FormRegistrationSingle onSubmit={registerSimple} />
      ) : (
        <Title subtitle>Inscrit.e</Title>
      )}
    </div>
  );
}
