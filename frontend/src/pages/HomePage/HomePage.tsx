import { useMemo } from "react";

import Title from "../../components/Title/Title";
import CalendarList from "./CalendarList/CalendarList";
import Separator from "../../components/Separator/Separator";
import { filterPast, filterToCome } from "../../utils/tournament";
import { useQueryTournaments } from "../../http/useHttpTournament";

export default function HomePage() {
  const { data: tournaments } = useQueryTournaments();

  const listPast = useMemo(
    () => filterPast(tournaments),
    [tournaments],
  );
  const listToCome = useMemo(
    () => filterToCome(tournaments),
    [tournaments],
  );

  return (
    <>
      <Title size="3xl">Calendrier des tournois</Title>
      <Separator />

      <div className="flex flex-col gap-10">
        <CalendarList
          title="Tournois à venir"
          tournaments={listToCome}
        />

        <CalendarList
          title="Tournois passés"
          tournaments={listPast}
        />
      </div>
    </>
  );
}
