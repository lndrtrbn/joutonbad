import { compareAsc } from "date-fns";
import { useEffect, useState } from "react";

import {
  TournamentList,
  groupByMonth,
} from "../../../utils/tournament";
import HomePageStyle from "./HomePage.style";
import useFetch from "../../../http/useFetch";
import Title from "../../../components/Title/Title";
import useHttpTournament from "../../../http/useHttpTournament";
import Separator from "../../../components/Separator/Separator";
import TournamentCard from "../../../components/TournamentCard/TournamentCard";

export default function HomePage() {
  const { getAllTournaments } = useHttpTournament();
  const [tournaments] = useFetch(getAllTournaments);

  const [listPast, setPast] = useState<TournamentList>([]);
  const [listToCome, setToCome] = useState<TournamentList>([]);

  useEffect(() => {
    const now = new Date().setHours(0, 0, 0, 0);
    const toCome = tournaments?.filter(
      (t) => compareAsc(now, new Date(t.startDate)) <= 0,
    );
    const past = tournaments?.filter(
      (t) => compareAsc(now, new Date(t.startDate)) > 0,
    );
    setToCome(groupByMonth(toCome ?? []));
    setPast(groupByMonth(past ?? []));
  }, [tournaments]);

  return (
    <>
      <Title size="3xl">Calendrier des tournois</Title>
      <Separator />

      <div className="flex flex-col gap-10">
        <section className="flex-1 border border-black/10 p-6 rounded-2xl max-w-[1140px]">
          <Title size="2xl">Tournois à venir</Title>

          <div className={HomePageStyle.list}>
            {listToCome.length == 0 && (
              <Title subtitle>
                Aucun tournoi à venir pour le moment
              </Title>
            )}
            {listToCome.map((monthList) => (
              <div
                key={monthList.month}
                className={HomePageStyle.month}
              >
                <Title size="xl" style="capitalize">
                  {monthList.month}
                </Title>

                <div className={HomePageStyle.monthList}>
                  {monthList.tournaments.map((tournament) => (
                    <TournamentCard
                      key={tournament.id}
                      tournament={tournament}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex-1 border border-black/10 p-6 rounded-2xl max-w-[1140px]">
          <Title size="2xl">Tournois passés</Title>
          <div className={HomePageStyle.list}>
            {listPast.length == 0 && (
              <Title subtitle>
                Aucun tournoi passé pour le moment
              </Title>
            )}
            {listPast.map((monthList) => (
              <div
                key={monthList.month}
                className={HomePageStyle.month}
              >
                <Title size="xl" style="capitalize">
                  {monthList.month}
                </Title>

                <div className={HomePageStyle.monthList}>
                  {monthList.tournaments.map((tournament) => (
                    <TournamentCard
                      key={tournament.id}
                      tournament={tournament}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
