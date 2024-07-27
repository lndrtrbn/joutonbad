import { useState } from "react";

import { Player } from "../../../utils/player";
import Alert from "../../../components/Alert/Alert";
import { Tournament } from "../../../utils/tournament";
import { Discipline } from "../../../utils/discipline";
import RegistrationAdminFormStyle from "./RegistrationAdminForm.style";
import InputSelectMembers from "../../../components/InputSelectMembers/InputSelectMembers";
import RegistrationDouble from "../../../components/RegistrationDouble/RegistrationDouble";
import InputSelectTournaments from "../../../components/InputSelectTournaments/InputSelectTournaments";
import TournamentRegistrationSimple from "../../../components/TournamentRegistrationSimple/TournamentRegistrationSimple";

type Props = {
  players: Player[];
  tournaments: Tournament[];
};

export default function RegistrationAdminForm({ players, tournaments }: Props) {
  const [selectedPlayer, setPlayer] = useState<Player>();
  const [selectedTournament, setTournament] = useState<Tournament>();

  function reset() {
    setPlayer(undefined);
    setTournament(undefined);
  }

  return (
    <>
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
        Les formulaires d'inscriptions s'afficheront une fois membre et tournoi
        choisis
      </Alert>

      {selectedPlayer && selectedTournament && (
        <div className="flex flex-col gap-8 mt-8">
          {(selectedTournament.disciplines.includes(Discipline.SH) ||
            selectedTournament.disciplines.includes(Discipline.SD)) && (
            <TournamentRegistrationSimple
              canRegister
              tournament={selectedTournament}
              playerLicense={selectedPlayer.license}
              onSuccess={reset}
            />
          )}

          {(selectedTournament.disciplines.includes(Discipline.DH) ||
            selectedTournament.disciplines.includes(Discipline.DD)) && (
            <RegistrationDouble
              canRegister
              discipline={Discipline.DH}
              tournament={selectedTournament}
              playerLicense={selectedPlayer.license}
              onSuccess={reset}
            />
          )}

          {selectedTournament.disciplines.includes(Discipline.DM) && (
            <RegistrationDouble
              canRegister
              discipline={Discipline.DM}
              tournament={selectedTournament}
              playerLicense={selectedPlayer.license}
              onSuccess={reset}
            />
          )}
        </div>
      )}
    </>
  );
}
