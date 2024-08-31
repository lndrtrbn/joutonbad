import { useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  filterDisciplines,
  groupByMonth,
  Tournament,
} from "../../../utils/tournament";
import Box from "../../../components/Box/Box";
import Title from "../../../components/Title/Title";
import InputTag from "../../../components/InputTag/InputTag";
import { Discipline, DISCIPLINES } from "../../../utils/discipline";
import TournamentCard from "../../../components/TournamentCard/TournamentCard";

type Props = {
  title: string;
  tournaments: Tournament[];
};

export default function CalendarList({ title, tournaments }: Props) {
  const { user } = useAuth0();

  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  const filteredTournaments = useMemo(
    () => groupByMonth(filterDisciplines(disciplines, tournaments)),
    [disciplines, tournaments],
  );

  function getRegisteredDisciplines(tournament: Tournament) {
    return tournament.registrations
      .filter(
        (reg) =>
          !reg.cancelled &&
          (reg.player.license === user?.name || reg.partner?.license === user?.name),
      )
      .map((reg) => reg.discipline);
  }

  return (
    <Box title={title} style="max-w-[1100px]">
      <InputTag
        label="Filtrer par tableaux"
        value={disciplines}
        onChange={(val) => setDisciplines(val as Discipline[])}
        list={DISCIPLINES}
      />

      <div className="flex gap-4 flex-wrap mt-8">
        {filteredTournaments.length == 0 && (
          <Title subtitle>Aucun tournoi correspondant aux filtres</Title>
        )}
        {filteredTournaments.map((monthList) => (
          <div key={monthList.month} className="w-full sm:w-auto">
            <Title size="xl" style="capitalize">
              {monthList.month}
            </Title>

            <div className="flex flex-col gap-4 mb-2">
              {monthList.tournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  registeredDisciplines={getRegisteredDisciplines(tournament)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}
