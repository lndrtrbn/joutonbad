import { useMemo } from "react";

import useFetch from "../../http/useFetch";
import Title from "../../components/Title/Title";
import CalendarList from "./CalendarList/CalendarList";
import Separator from "../../components/Separator/Separator";
import useHttpTournament from "../../http/useHttpTournament";
import { filterPast, filterToCome } from "../../utils/tournament";

export default function HomePage() {
  const { getAllTournaments } = useHttpTournament();
  const [tournaments] = useFetch(getAllTournaments);

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
