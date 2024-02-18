import { useEffect, useMemo, useState } from "react";

import {
  byCreatedDate,
  byStartDate,
  filterDiscipline,
  filterLevel,
  filterToCome,
} from "../../../utils/tournament";
import {
  Registration,
  filterByDiscipline,
} from "../../../utils/registration";
import HomePageStyle from "./HomePage.style";
import useFetch from "../../../http/useFetch";
import { LEVELS, Level } from "../../../utils/level";
import MText from "../../../components/mobile/MText/MText";
import MFact from "../../../components/mobile/MFact/MFact";
import useHttpTournament from "../../../http/useHttpTournament";
import { useAuthContext } from "../../../contexts/auth.context";
import { DISCIPLINES, Discipline } from "../../../utils/discipline";
import MInputRange from "../../../components/mobile/MInputRange/MInputRange";
import MInputSwitch from "../../../components/mobile/MInputSwitch/MInputSwitch";
import MTournamentHList from "../../../components/mobile/MTournamentHList/MTournamentHList";

export default function HomePage() {
  const {
    user: [user],
  } = useAuthContext();

  const { getTournamentsByPlayer, getAllTournaments } =
    useHttpTournament();

  const [myTournaments] = useFetch(getTournamentsByPlayer);
  const [tournaments] = useFetch(getAllTournaments);

  const [discipline, setDiscipline] = useState<Discipline>();
  const [levelRange, setLevelRange] = useState<[Level, Level]>([
    Level.NC,
    Level.N1,
  ]);

  const [cost, setCost] = useState(0);
  const [myRegistrations, setRegistrations] = useState<
    Registration[]
  >([]);

  useEffect(() => {
    if (user) {
      setCost(0);
      setRegistrations([]);

      (myTournaments ?? []).forEach((tournament) => {
        const registrations = tournament.registrations.filter(
          (reg) => reg.player.license == user.license,
        );
        setRegistrations((regs) => [...regs, ...registrations]);
        if (registrations.length == 1)
          setCost((c) => c + tournament.prices[0]);
        if (registrations.length == 2)
          setCost((c) => c + tournament.prices[1]);
        if (registrations.length == 3)
          setCost((c) => c + tournament.prices[2]);
      });
    }
  }, [myTournaments, user]);

  const tournamentsToCome = useMemo(() => {
    return byStartDate(filterToCome(myTournaments));
  }, [myTournaments]);

  const lastTournaments = useMemo(() => {
    return byCreatedDate(
      filterLevel(
        levelRange[0],
        levelRange[1],
        filterDiscipline(discipline, tournaments?.slice(0, 10)),
      ),
    );
  }, [tournaments, discipline, levelRange]);

  function toggleDiscipline(d: Discipline) {
    setDiscipline(discipline === d ? undefined : d);
  }

  const regSH = filterByDiscipline(myRegistrations, [Discipline.SH]);
  const regSD = filterByDiscipline(myRegistrations, [Discipline.SD]);
  const regDH = filterByDiscipline(myRegistrations, [Discipline.DH]);
  const regDD = filterByDiscipline(myRegistrations, [Discipline.DD]);
  const regDM = filterByDiscipline(myRegistrations, [Discipline.DM]);

  return (
    <div className={HomePageStyle.base}>
      <MText type="title" style="px-6 pb-6">
        Mes tournois
      </MText>
      <MTournamentHList
        style="px-6 pb-6"
        tournaments={tournamentsToCome}
        noneLabel="Tu n'es inscrit.e à aucun tournoi"
        accentModulo={10000}
      />

      <MText type="subtitle" style="px-6 pt-12 pb-6">
        Derniers Ajouts
      </MText>
      <MInputSwitch
        items={DISCIPLINES}
        style="px-6 mb-6"
        value={discipline}
        onChange={toggleDiscipline}
      />
      <MInputRange
        items={LEVELS}
        style="px-6 mb-6"
        value={levelRange}
        onChange={setLevelRange}
      />

      <MTournamentHList
        style="px-6 pb-6"
        tournaments={lastTournaments}
        noneLabel="Aucun tournoi ajouté"
        accentModulo={0}
      />

      <MText type="subtitle" style="px-6 pt-12 pb-6">
        Mes stats
      </MText>
      <div className="px-6 flex flex-wrap gap-4">
        <MFact label="Tournois" value={myTournaments?.length ?? 0} />
        <MFact label="Tableaux" value={myRegistrations.length} />
        {!!regSH.length && <MFact label="SH" value={regSH.length} />}
        {!!regSD.length && <MFact label="SD" value={regSD.length} />}
        {!!regDH.length && <MFact label="DH" value={regDH.length} />}
        {!!regDD.length && <MFact label="DD" value={regDD.length} />}
        {!!regDM.length && <MFact label="DM" value={regDM.length} />}
        <MFact label="€ payé par le club" value={cost} />
      </div>
    </div>
  );
}
