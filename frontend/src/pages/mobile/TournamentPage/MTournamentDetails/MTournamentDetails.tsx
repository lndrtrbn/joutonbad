import { fr } from "date-fns/locale";
import { format, subDays } from "date-fns";
import { faSun, faWarning } from "@fortawesome/free-solid-svg-icons";

import { Tournament } from "../../../../utils/tournament";
import MText from "../../../../components/mobile/MText/MText";
import MIcon from "../../../../components/mobile/MIcon/MIcon";
import MLink from "../../../../components/mobile/MLink/MLink";
import MTournamentDetailsStyle from "./MTournamentDetails.style";
import MCardInfo from "../../../../components/mobile/MCardInfo/MCardInfo";
import MScrollRow from "../../../../components/mobile/MScrollRow/MScrollRow";
import MContainer from "../../../../components/mobile/MContainer/MContainer";

type Props = {
  tournament: Tournament;
};

export default function MTournamentDetails({ tournament }: Props) {
  function strDate(isoDate: string) {
    return format(new Date(isoDate), "EEEE dd MMMM yyyy", {
      locale: fr,
    });
  }

  return (
    <>
      <MText type="subtitle" style="px-6 pb-6">
        {tournament.name}
      </MText>
      <div className={MTournamentDetailsStyle.row}>
        <MIcon icon={faSun} />
        <div className={MTournamentDetailsStyle.col}>
          <MText type="small" color="text-m-moonlight60" style="pb-2">
            Du {strDate(tournament.startDate)}
          </MText>
          <MText type="small" color="text-m-moonlight60">
            Au {strDate(tournament.endDate)}
          </MText>
        </div>
      </div>

      {tournament.links.length > 0 && (
        <div className="flex gap-4 px-6 mb-6">
          {tournament.links.map((link) => (
            <MLink key={link.name} to={link.url} target="_blank">
              {link.name}
            </MLink>
          ))}
        </div>
      )}

      <MScrollRow style="px-6 mb-6">
        <MContainer style="gap-6 shrink-0" bg="bg-m-main">
          <div className={MTournamentDetailsStyle.bullet}>
            <MText type="small" color="text-m-black70">
              Lieu
            </MText>
            <MText type="text" color="text-m-black" style="mb-1">
              {tournament.location}
            </MText>
          </div>
          <div className={MTournamentDetailsStyle.bullet}>
            <MText type="small" color="text-m-black70">
              Classements
            </MText>
            <MText type="text" color="text-m-black" style="mb-1">
              {`${tournament.minLevel} à ${tournament.maxLevel}`}
            </MText>
          </div>
          <div className={MTournamentDetailsStyle.bullet}>
            <MText type="small" color="text-m-black70">
              Tableaux
            </MText>
            <MText type="text" color="text-m-black" style="mb-1">
              {tournament.disciplines.join(" ")}
            </MText>
          </div>
          <div className={MTournamentDetailsStyle.bullet}>
            <MText type="small" color="text-m-black70">
              Responsable
            </MText>
            <MText type="text" color="text-m-black" style="mb-1">
              {`${tournament.inCharge.name} ${tournament.inCharge.lastname}`}
            </MText>
          </div>
          <div className={MTournamentDetailsStyle.bullet}>
            <MText type="small" color="text-m-black70">
              Prix / nb tableaux
            </MText>
            <MText type="text" color="text-m-black" style="mb-1">
              {tournament.prices.map((p) => `${p}€`).join(" | ")}
            </MText>
          </div>
        </MContainer>
      </MScrollRow>

      <MCardInfo icon={faWarning} style="mx-6 mb-6">
        Fin des inscriptions le{" "}
        {format(
          subDays(new Date(tournament.startDate), 14),
          "dd/MM ",
        )}
      </MCardInfo>
    </>
  );
}
