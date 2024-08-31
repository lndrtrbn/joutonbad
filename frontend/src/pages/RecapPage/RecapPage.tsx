import { compareAsc } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useMemo, useState } from "react";

import Box from "../../components/Box/Box";
import RecapPageStyle from "./RecapPage.style";
import Title from "../../components/Title/Title";
import { Tournament } from "../../utils/tournament";
import { Discipline } from "../../utils/discipline";
import Separator from "../../components/Separator/Separator";
import { useQuerySettings } from "../../http/useHttpSettings";
import CalendarList from "../HomePage/CalendarList/CalendarList";
import { useQueryTournamentsByPlayer } from "../../http/useHttpTournament";
import { Registration, filterByDiscipline } from "../../utils/registration";

export default function RecapPage() {
  const { user } = useAuth0();
  const { data: settings } = useQuerySettings();
  const { data: myTournaments } = useQueryTournamentsByPlayer();

  const [toCome, setToCome] = useState<Tournament[]>([]);
  const [past, setPast] = useState<Tournament[]>([]);

  const [myRegistrations, setMyregistrations] = useState<Registration[]>([]);
  const [cost, setCost] = useState(0);

  const personalCost = useMemo(() => {
    const value = cost - (settings?.clubPart ?? 0);
    return value > 0 ? value : 0;
  }, [cost, settings]);

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
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        )
        .forEach((tournament) => {
          // Sort tournaments if passed or not.
          const date = new Date(tournament.startDate);
          if (compareAsc(now, date) > 0) newPast.push(tournament);
          else newToCome.push(tournament);

          // Compute how much the player have to pay.
          const registrations = tournament.registrations.filter(
            (reg) => reg.player.license == user.name && !reg.cancelled,
          );
          setMyregistrations((regs) => [...regs, ...registrations]);
          if (registrations.length == 1) setCost((c) => c + tournament.prices[0]);
          if (registrations.length == 2)
            setCost((c) => c + (tournament.prices[1] ?? tournament.prices[0]));
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

      <div className="flex flex-col gap-10">
        <Box title="Statistiques" style="max-w-[640px]">
          <div className="flex flex-wrap gap-4">
            <div className={RecapPageStyle.stat}>
              {myTournaments.length} Tournois | {myRegistrations.length} Tableaux
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
              {cost}€ avancé par le club | {personalCost}€ à charge
            </div>
          </div>
        </Box>

        <CalendarList
          title={`Mes tournois à venir (${toCome.length})`}
          tournaments={toCome}
        />

        <CalendarList
          title={`Mes tournois déjà joués (${past.length})`}
          tournaments={past}
        />
      </div>
    </>
  );
}
