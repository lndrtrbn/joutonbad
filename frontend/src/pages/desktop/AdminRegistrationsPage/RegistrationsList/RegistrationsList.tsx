import { useEffect, useMemo, useState } from "react";

import { Player } from "../../../../utils/player";
import Title from "../../../../components/Title/Title";
import { Tournament } from "../../../../utils/tournament";
import usePagination from "../../../../hooks/usePagination";
import { Registration } from "../../../../utils/registration";
import RegistrationsListStyle from "./RegistrationsList.style";
import RegistrationRow from "./RegistrationRow/RegistrationRow";
import Pagination from "../../../../components/Pagination/Pagination";
import InputSelectMembers from "../../../../components/InputSelectMembers/InputSelectMembers";
import InputSelectTournaments from "../../../../components/InputSelectTournaments/InputSelectTournaments";

type Props = {
  noResultLabel: string;
  registrations: Registration[];
  onDelete: (id: string) => Promise<unknown>;
  onCancel?: (id: string, reason: string) => Promise<unknown>;
  onSend?: (id: string) => Promise<unknown>;
};

export default function RegistrationsList({
  registrations,
  onSend,
  onDelete,
  onCancel,
  noResultLabel,
}: Props) {
  const [selectedPlayer, setPlayer] = useState<Player>();
  const [selectedTournament, setTournament] = useState<Tournament>();

  const [filtered, setFiltered] = useState<Registration[]>([]);
  const [paginatedRegistrations, pagination] = usePagination(
    filtered.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime(),
    ),
  );

  const players = useMemo(() => {
    const listPlayers: Player[] = [];
    registrations.forEach((reg) => {
      if (!listPlayers.some((p) => p.id === reg.player.id)) {
        listPlayers.push(reg.player);
      }
    });
    return listPlayers;
  }, [registrations]);

  const tournaments = useMemo(() => {
    const listTournaments: Tournament[] = [];
    registrations.forEach((reg) => {
      if (
        reg.tournament &&
        !listTournaments.some((t) => t.id === reg.tournament?.id)
      ) {
        listTournaments.push(reg.tournament);
      }
    });
    return listTournaments;
  }, [registrations]);

  useEffect(() => {
    let filteredRegistrations = [...registrations];
    if (selectedPlayer) {
      filteredRegistrations = [
        ...filteredRegistrations.filter(
          (reg) => reg.player.id === selectedPlayer.id,
        ),
      ];
    }
    if (selectedTournament) {
      filteredRegistrations = [
        ...filteredRegistrations.filter(
          (reg) => reg.tournament?.id === selectedTournament.id,
        ),
      ];
    }
    setFiltered(filteredRegistrations);
  }, [registrations, selectedPlayer, selectedTournament]);

  return (
    <section className="flex flex-col gap-4">
      {registrations.length > 0 && (
        <div className={RegistrationsListStyle.header}>
          <InputSelectMembers
            value={selectedPlayer}
            onChange={setPlayer}
            players={players ?? []}
            placeholder="Filtre par membre"
          />

          <InputSelectTournaments
            value={selectedTournament}
            onChange={setTournament}
            tournaments={tournaments ?? []}
            placeholder="Filtre par tournois"
          />
        </div>
      )}

      <div className="overflow-auto">
        {paginatedRegistrations.map((reg, i) => (
          <RegistrationRow
            canSend={onSend !== undefined}
            canCancel={onCancel !== undefined}
            onSend={onSend}
            onDelete={onDelete}
            onCancel={onCancel}
            registration={reg}
            key={reg.id}
            alt={i % 2 == 0}
          />
        ))}
        {filtered.length == 0 && (
          <Title subtitle>{noResultLabel}</Title>
        )}
      </div>
      <Pagination {...pagination} />
    </section>
  );
}
