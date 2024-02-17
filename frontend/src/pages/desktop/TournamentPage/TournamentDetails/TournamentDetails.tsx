import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";

import Tag from "../../../../components/Tag/Tag";
import Link from "../../../../components/Link/Link";
import Alert from "../../../../components/Alert/Alert";
import Title from "../../../../components/Title/Title";
import { Tournament } from "../../../../utils/tournament";
import TagList from "../../../../components/TagList/TagList";
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
    <>
      <div className={TournamentDetailsStyle.base}>
        <Title size="3xl">{tournament.name}</Title>

        <div className={TournamentDetailsStyle.subtitle}>
          <Title subtitle>À {tournament.location}</Title>
          <Title subtitle>
            Début {strDate(tournament.startDate)}
          </Title>
          <Title subtitle>Fin {strDate(tournament.endDate)}</Title>
        </div>
      </div>

      <div className={TournamentDetailsStyle.details}>
        {tournament.inCharge && (
          <div>
            <Title>Responsable REC</Title>
            <p>
              {tournament.inCharge.lastname}{" "}
              {tournament.inCharge.name}
            </p>
          </div>
        )}

        <div>
          <Title>Tableaux joués</Title>
          <TagList>
            {tournament.disciplines.map((discipline) => (
              <Tag key={discipline} size="sm">
                {discipline}
              </Tag>
            ))}
          </TagList>
        </div>

        <div>
          <Title>Classements autorisés</Title>
          <TagList>
            <Tag size="sm">{tournament.minLevel}</Tag>
            <span>à</span>
            <Tag size="sm">{tournament.maxLevel}</Tag>
          </TagList>
        </div>
      </div>

      <div>
        <Title>Prix des tableaux</Title>
        <div className={TournamentDetailsStyle.list}>
          {tournament.prices.map((price, i) => (
            <span key={i} className={TournamentDetailsStyle.price}>
              {i + 1} tableaux <Tag size="sm">{price}€</Tag>
            </span>
          ))}
        </div>
      </div>

      {tournament.links.length > 0 && (
        <div>
          <Title>Liens</Title>
          <div className={TournamentDetailsStyle.list}>
            {tournament.links.map((link) => (
              <Link
                key={link.name}
                to={link.url}
                inline
                target="_blank"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {!tournament.freezed ? (
        <Alert type="info">
          Fin des inscriptions le{" "}
          {strDate(
            subDays(new Date(tournament.startDate), 14).toISOString()
          )}
        </Alert>
      ) : (
        <Alert type="info">
          Les inscriptions ont été clôturées. Ceci peut être dû au
          fait que le tournoi soit complet.
        </Alert>
      )}
    </>
  );
}
