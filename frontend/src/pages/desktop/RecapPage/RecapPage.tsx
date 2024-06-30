import { compareAsc } from "date-fns";
import { useEffect, useState } from "react";

import {
  Registration,
  filterByDiscipline,
} from "../../../utils/registration";
import useFetch from "../../../http/useFetch";
import RecapPageStyle from "./RecapPage.style";
import Link from "../../../components/Link/Link";
import Title from "../../../components/Title/Title";
import { Tournament } from "../../../utils/tournament";
import { Discipline } from "../../../utils/discipline";
import useHttpTournament from "../../../http/useHttpTournament";
import { useAuthContext } from "../../../contexts/auth.context";
import Separator from "../../../components/Separator/Separator";
import TournamentCard from "../../../components/TournamentCard/TournamentCard";

export default function RecapPage() {
  const {
    user: [user],
  } = useAuthContext();

  const { getTournamentsByPlayer } = useHttpTournament();
  const [myTournaments] = useFetch(getTournamentsByPlayer);

  const [toCome, setToCome] = useState<Tournament[]>([]);
  const [past, setPast] = useState<Tournament[]>([]);

  const [myRegistrations, setMyregistrations] = useState<
    Registration[]
  >([]);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    if (user) {
      setCost(0);
      setMyregistrations([]);

      const now = new Date().setHours(0, 0, 0, 0);
      const newToCome: Tournament[] = [];
      const newPast: Tournament[] = [];

      myTournaments
        ?.sort(
          (a, b) =>
            new Date(a.startDate).getTime() -
            new Date(b.startDate).getTime(),
        )
        .forEach((tournament) => {
          // Sort tournaments if passed or not.
          const date = new Date(tournament.startDate);
          if (compareAsc(now, date) > 0) newPast.push(tournament);
          else newToCome.push(tournament);

          // Compute how much the player have to pay.
          const registrations = tournament.registrations.filter(
            (reg) =>
              reg.player.license == user.license && !reg.cancelled,
          );
          setMyregistrations((regs) => [...regs, ...registrations]);
          if (registrations.length == 1)
            setCost((c) => c + tournament.prices[0]);
          if (registrations.length == 2)
            setCost(
              (c) =>
                c + (tournament.prices[1] ?? tournament.prices[0]),
            );
          if (registrations.length == 3)
            setCost(
              (c) =>
                c +
                (tournament.prices[2] ??
                  tournament.prices[1] ??
                  tournament.prices[0]),
            );
        });

      setToCome(newToCome);
      setPast(newPast);
    }
  }, [myTournaments, user]);

  const regSH = filterByDiscipline(myRegistrations, [Discipline.SH]);
  const regSD = filterByDiscipline(myRegistrations, [Discipline.SD]);
  const regDH = filterByDiscipline(myRegistrations, [Discipline.DH]);
  const regDD = filterByDiscipline(myRegistrations, [Discipline.DD]);
  const regDM = filterByDiscipline(myRegistrations, [Discipline.DM]);

  if (!myTournaments) {
    return null;
  }

  return (
    <>
      <Title size="3xl">Recap de mes inscriptions</Title>
      <Separator />

      <div className={RecapPageStyle.base}>
        <section className="border border-black/10 p-6 rounded-2xl max-w-[640px]">
          <Title size="2xl">Statistiques</Title>

          <div className="flex flex-wrap gap-4">
            <div className={RecapPageStyle.stat}>
              {myTournaments.length} Tournois |{" "}
              {myRegistrations.length} Tableaux
            </div>
            <div className={RecapPageStyle.stat}>
              {[
                !!regSH.length && regSH.length + " SH",
                !!regSD.length && regSD.length + " SD",
                !!regDH.length && regDH.length + " DH",
                !!regDD.length && regDD.length + " DD",
                !!regDM.length && regDM.length + " DM",
              ]
                .filter((a) => !!a)
                .join(" | ")}
            </div>
            <div className={RecapPageStyle.stat}>
              {cost}€ payé par le club
            </div>
          </div>
        </section>

        <section className="border border-black/10 p-6 rounded-2xl max-w-[1140px]">
          <Title size="2xl">
            Mes tournois à venir ({toCome.length})
          </Title>

          <div className={RecapPageStyle.list}>
            {toCome.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
              />
            ))}
            {toCome.length == 0 && (
              <Title subtitle>
                Aucun tournoi à venir, tu peux aller voir le{" "}
                <Link inline to="/">
                  calendrier
                </Link>{" "}
                pour t'inscrire
              </Title>
            )}
          </div>
        </section>

        <section className="border border-black/10 p-6 rounded-2xl max-w-[1140px]">
          <Title size="2xl">
            Mes tournois déjà joués ({past.length})
          </Title>

          <div className={RecapPageStyle.list}>
            {past.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
              />
            ))}
            {past.length == 0 && (
              <Title subtitle>
                Aucun tournoi joué jusqu'à présent
              </Title>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
