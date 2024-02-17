import MCardInfo from "../MCardInfo/MCardInfo";
import MScrollRow from "../MScrollRow/MScrollRow";
import { Tournament } from "../../../utils/tournament";
import MTournamentCard from "../MTournamentCard/MTournamentCard";

type Props = {
  tournaments: Tournament[];
  noneLabel: string;
  accentModulo?: number;
  style?: string;
};

export default function MTournamentHList({
  tournaments,
  noneLabel,
  accentModulo = 0,
  style,
}: Props) {
  return (
    <MScrollRow style={style}>
      {tournaments.length === 0 && <MCardInfo>{noneLabel}</MCardInfo>}
      {tournaments.map((tournament, i) => (
        <MTournamentCard
          key={i}
          variant={i % accentModulo === 0 ? "main" : "light"}
          tournament={tournament}
          style="w-[88vw]"
        />
      ))}
    </MScrollRow>
  );
}
