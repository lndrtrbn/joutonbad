import { compareAsc } from "date-fns";
import { useEffect, useState } from "react";

import useFetch from "../../../http/useFetch";
import RecapPageStyle from "./RecapPage.style";
import Link from "../../../components/Link/Link";
import Title from "../../../components/Title/Title";
import { Tournament } from "../../../utils/tournament";
import useHttpTournament from "../../../http/useHttpTournament";
import { useAuthContext } from "../../../contexts/auth.context";
import Separator from "../../../components/Separator/Separator";
import TournamentCard from "../../../components/TournamentCard/TournamentCard";

export default function RecapPage() {
  const {
    user: [user],
  } = useAuthContext();

  const { getTournamentsByPlayer } = useHttpTournament();
  const [tournaments] = useFetch(getTournamentsByPlayer);

  const [toCome, setToCome] = useState<Tournament[]>([]);
  const [past, setPast] = useState<Tournament[]>([]);

  const [nbParticipations, setParticipations] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    if (user) {
      setCost(0);
      setParticipations(0);

      const now = new Date().setHours(0, 0, 0, 0);
      const newToCome: Tournament[] = [];
      const newPast: Tournament[] = [];

      tournaments
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
          ).length;
          setParticipations((val) => val + registrations);
          if (registrations == 1)
            setCost((c) => c + tournament.prices[0]);
          if (registrations == 2)
            setCost((c) => c + tournament.prices[1]);
          if (registrations == 3)
            setCost((c) => c + tournament.prices[2]);
        });

      setToCome(newToCome);
      setPast(newPast);
    }
  }, [tournaments, user]);

  if (!tournaments) {
    return null;
  }

  return (
    <>
      <Title size="3xl">Recap de mes inscriptions</Title>
      <Title subtitle>
        Tu trouveras ici tes tournois à venir et la liste de tes
        tournois joués
      </Title>

      <Separator />

      <div className={RecapPageStyle.base}>
        <section>
          <Title size="2xl">
            {nbParticipations} Tableau
            {nbParticipations > 1 ? "x" : ""} au total
          </Title>
          <Title subtitle>
            Pour un coût total d'inscriptions de {cost}€
          </Title>
        </section>

        <section>
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

        <section>
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
