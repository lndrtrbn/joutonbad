import { useState } from "react";

import useHttpRegistration, {
  CreateRegistrationPayload,
} from "../../../../http/useHttpRegistration";
import { Player } from "../../../../utils/player";
import { APIError } from "../../../../utils/error";
import Title from "../../../../components/Title/Title";
import Alert from "../../../../components/Alert/Alert";
import { Tournament } from "../../../../utils/tournament";
import { Discipline } from "../../../../utils/discipline";
import RegistrationAdminFormStyle from "./RegistrationAdminForm.style";
import InputSelectMembers from "../../../../components/InputSelectMembers/InputSelectMembers";
import RegistrationDouble from "../../../../components/RegistrationDouble/RegistrationDouble";
import InputSelectTournaments from "../../../../components/InputSelectTournaments/InputSelectTournaments";
import TournamentRegistrationSimple from "../../../../components/TournamentRegistrationSimple/TournamentRegistrationSimple";

type Props = {
  players: Player[];
  tournaments: Tournament[];
  onRegistration: () => void;
};

export default function RegistrationAdminForm({
  players,
  tournaments,
  onRegistration,
}: Props) {
  const { createRegistration } = useHttpRegistration();

  const [selectedPlayer, setPlayer] = useState<Player>();
  const [selectedTournament, setTournament] = useState<Tournament>();

  const [submitError, setError] = useState<{
    [key: string]: APIError;
  }>();

  async function register(
    discipline: Discipline,
    payload: CreateRegistrationPayload,
  ) {
    try {
      setError(undefined);
      await createRegistration(payload);
      onRegistration();
      setPlayer(undefined);
      setTournament(undefined);
    } catch (error) {
      error instanceof APIError && setError({ [discipline]: error });
    }
  }

  return (
    <section>
      <Title size="2xl">Inscrire un.e membre</Title>

      <div className={RegistrationAdminFormStyle.header}>
        <InputSelectMembers
          onChange={setPlayer}
          value={selectedPlayer}
          players={players ?? []}
        />
        <InputSelectTournaments
          onChange={setTournament}
          value={selectedTournament}
          tournaments={tournaments ?? []}
        />
      </div>

      <Alert type="info">
        Les formulaires d'inscriptions s'afficheront une fois membre
        et tournoi choisis
      </Alert>

      {selectedPlayer && selectedTournament && (
        <div className="flex flex-col gap-8 mt-8">
          {(selectedTournament.disciplines.includes(Discipline.SH) ||
            selectedTournament.disciplines.includes(
              Discipline.SD,
            )) && (
            <TournamentRegistrationSimple
              canRegister
              tournament={selectedTournament}
              registrations={selectedTournament.registrations}
              playerLicense={selectedPlayer.license}
              register={(data) => register(Discipline.SH, data)}
            />
          )}

          {(selectedTournament.disciplines.includes(Discipline.DH) ||
            selectedTournament.disciplines.includes(
              Discipline.DD,
            )) && (
            <RegistrationDouble
              canRegister
              discipline={Discipline.DH}
              tournament={selectedTournament}
              registrations={selectedTournament.registrations}
              playerLicense={selectedPlayer.license}
              register={(data) => register(Discipline.DH, data)}
              error={submitError?.[Discipline.DH]}
            />
          )}

          {selectedTournament.disciplines.includes(Discipline.DM) && (
            <RegistrationDouble
              canRegister
              discipline={Discipline.DM}
              tournament={selectedTournament}
              registrations={selectedTournament.registrations}
              playerLicense={selectedPlayer.license}
              register={(data) => register(Discipline.DM, data)}
              error={submitError?.[Discipline.DM]}
            />
          )}
        </div>
      )}
    </section>
  );
}
