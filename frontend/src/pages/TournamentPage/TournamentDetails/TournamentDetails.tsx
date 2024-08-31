import { fr } from "date-fns/locale";
import { format, subDays } from "date-fns";

import Link from "../../../components/Link/Link";
import Alert from "../../../components/Alert/Alert";
import Title from "../../../components/Title/Title";
import { Tournament } from "../../../utils/tournament";
import TournamentDetailsStyle from "./TournamentDetails.style";

type Props = {
  tournament: Tournament;
};

export default function TournamentDetails({ tournament }: Props) {
  function strDate(isoDate: string) {
    return format(new Date(isoDate), "EEEE dd MMMM yyyy", {
      locale: fr,
    });
  }

  return (
    <section className="border border-black/10 p-6 rounded-xl max-w-[1140px]">
      <Title size="2xl">Détails du tournoi</Title>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <Title subtitle>Début {strDate(tournament.startDate)}</Title>
          <Title subtitle>Fin {strDate(tournament.endDate)}</Title>
        </div>

        <div className="bg-bg px-6 py-4 rounded-xl flex flex-wrap gap-8 gap-y-4">
          <section>
            <p>Lieu</p>
            <Title style="mb-0">{tournament.location}</Title>
          </section>

          <section>
            <p>Prix / nb tableaux</p>
            <Title style="mb-0">
              {tournament.prices.map((p) => `${p}€`).join(" | ")}
            </Title>
          </section>

          <section>
            <p>Tableaux</p>
            <Title style="mb-0">{tournament.disciplines.join(" ")}</Title>
          </section>

          <section>
            <p>Classements</p>
            <Title style="mb-0">
              {tournament.minLevel} à {tournament.maxLevel}
            </Title>
          </section>

          <section>
            <p>Responsable</p>
            <Title style="mb-0">
              {tournament.inCharge.lastname} {tournament.inCharge.name}
            </Title>
          </section>

          <section>
            <p>Nocturne</p>
            <Title style="mb-0">{tournament.nocturne ? "Oui" : "Non"}</Title>
          </section>

          {tournament.links.length > 0 && (
            <section>
              <p>Liens</p>
              <div className={TournamentDetailsStyle.list}>
                {tournament.links.map((link) => (
                  <Link key={link.name} to={link.url} inline target="_blank">
                    {link.name}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <Alert type="info">
          Fin des inscriptions le{" "}
          {strDate(subDays(new Date(tournament.startDate), 14).toISOString())}
        </Alert>
      </div>
    </section>
  );
}
