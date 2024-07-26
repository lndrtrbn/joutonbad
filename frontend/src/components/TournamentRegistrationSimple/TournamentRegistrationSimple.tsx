import {
  CreateRegistrationPayload,
  useCreateRegistration,
} from "../../http/useHttpRegistration";
import FormRegistrationSingle, {
  RegistrationSingleInputs,
} from "./FormRegistrationSingle/FormRegistrationSingle";
import Title from "../Title/Title";
import { Tournament } from "../../utils/tournament";
import { Discipline } from "../../utils/discipline";

type Props = {
  tournament: Tournament;
  playerLicense: string;
  canRegister: boolean;
  onSuccess?: () => void;
};

export default function TournamentRegistrationSimple({
  tournament,
  canRegister,
  playerLicense,
  onSuccess,
}: Props) {
  const { mutateAsync, isPending } = useCreateRegistration();

  const registration = tournament.registrations.find(
    (reg) =>
      reg.player.license == playerLicense &&
      !reg.cancelled &&
      (reg.discipline == Discipline.SD || reg.discipline == Discipline.SH),
  );

  function registerSimple(data: RegistrationSingleInputs) {
    if (data.discipline && data.rank) {
      const payload: CreateRegistrationPayload = {
        discipline: data.discipline,
        level: data.rank,
        tournamentId: tournament.id,
        playerLicense,
      };
      mutateAsync(payload, { onSuccess });
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
          loading={isPending}
          disciplines={disciplines}
        />
      ) : (
        <Title subtitle>Inscrit.e</Title>
      )}
    </div>
  );
}
