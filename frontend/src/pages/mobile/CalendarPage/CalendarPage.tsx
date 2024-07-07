import { useEffect, useState } from "react";

import {
  TournamentList,
  filterDisciplines,
  filterLevel,
  filterPast,
  filterToCome,
  groupByMonth,
} from "../../../utils/tournament";
import useFetch from "../../../http/useFetch";
import { LEVELS, Level } from "../../../utils/level";
import CalendarPageStyle from "./CalendarPage.style";
import MText from "../../../components/mobile/MText/MText";
import useHttpTournament from "../../../http/useHttpTournament";
import { DISCIPLINES, Discipline } from "../../../utils/discipline";
import MCardInfo from "../../../components/mobile/MCardInfo/MCardInfo";
import MInputRange from "../../../components/mobile/MInputRange/MInputRange";
import MInputSwitch from "../../../components/mobile/MInputSwitch/MInputSwitch";
import MTournamentHList from "../../../components/mobile/MTournamentHList/MTournamentHList";

export default function CalendarPage() {
  const { getAllTournaments } = useHttpTournament();
  const [tournaments] = useFetch(getAllTournaments);

  const [listPast, setPast] = useState<TournamentList>([]);
  const [listToCome, setToCome] = useState<TournamentList>([]);

  const [discipline, setDiscipline] = useState<Discipline>();
  const [levelRange, setLevelRange] = useState<[Level, Level]>([
    Level.NC,
    Level.N1,
  ]);

  function toggleDiscipline(d: Discipline) {
    setDiscipline(discipline === d ? undefined : d);
  }

  useEffect(() => {
    setToCome(
      groupByMonth(
        filterLevel(
          levelRange[0],
          levelRange[1],
          filterDisciplines([], filterToCome(tournaments)),
        ),
      ),
    );
    setPast(groupByMonth(filterPast(tournaments)));
  }, [tournaments, discipline, levelRange]);

  return (
    <div className={CalendarPageStyle.base}>
      <MText type="title" style="px-6 pb-6">
        Calendrier
      </MText>
      <MInputSwitch
        items={DISCIPLINES}
        style="px-6 mb-4"
        value={discipline}
        onChange={toggleDiscipline}
      />
      <MInputRange
        items={LEVELS}
        style="px-6 mb-12"
        value={levelRange}
        onChange={setLevelRange}
      />

      {listToCome.length === 0 && (
        <MCardInfo style="mx-6 mb-12">
          Aucun tournoi ajouté dans le calendrier
        </MCardInfo>
      )}

      {listToCome.map(({ month, tournaments }) => (
        <div key={month}>
          <MText type="accent" style="px-6 pb-6 capitalize">
            {month}
          </MText>
          <MTournamentHList
            style="px-6 pb-12"
            tournaments={tournaments}
            noneLabel="Aucun tournoi pendant ce mois"
            accentModulo={0}
          />
        </div>
      ))}

      <MText type="subtitle" style="px-6 pt-6 pb-12">
        Tournois passés
      </MText>
      {listPast.length === 0 && (
        <MCardInfo style="mx-6">Aucun tournoi déjà passé</MCardInfo>
      )}
      {listPast.map(({ month, tournaments }) => (
        <div key={month}>
          <MText type="accent" style="px-6 pb-6 capitalize">
            {month}
          </MText>
          <MTournamentHList
            style="px-6 pb-6"
            tournaments={tournaments}
            noneLabel="Aucun tournoi pendant ce mois"
            accentModulo={0}
          />
        </div>
      ))}
    </div>
  );
}
