import { format } from "date-fns";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { faSun } from "@fortawesome/free-solid-svg-icons";

import MTag, { MTagProps } from "../MTag/MTag";
import MIcon, { MIconProps } from "../MIcon/MIcon";
import MText, { MTextProps } from "../MText/MText";
import { Discipline } from "../../../utils/discipline";
import { Tournament } from "../../../utils/tournament";
import MTournamentCardStyle from "./MTournamentCard.style";
import { useAuthContext } from "../../../contexts/auth.context";

type Props = {
  tournament: Tournament;
  variant?: "main" | "light";
  style?: string;
};

type VariantStyle = {
  iconBg: MIconProps["bg"];
  iconColor: MIconProps["color"];
  text: MTextProps["color"];
  smallText: MTextProps["color"];
  tag: MTagProps["variant"];
  tagActive: MTagProps["variant"];
};

const variantStyles: { [key: string]: VariantStyle } = {
  main: {
    iconBg: "bg-m-black20",
    iconColor: "text-m-black",
    text: "text-m-black",
    smallText: "text-m-black50",
    tag: "dark",
    tagActive: "black",
  },
  light: {
    iconBg: "bg-m-moon10",
    iconColor: "text-m-white",
    text: "text-m-white",
    smallText: "text-m-moon50",
    tag: "light",
    tagActive: "main",
  },
};

export default function MTournamentCard({
  tournament,
  variant = "light",
  style,
}: Props) {
  const {
    user: [user],
  } = useAuthContext();

  function hasRegistered(discipline: Discipline) {
    return tournament.registrations.some((registration) => {
      return (
        registration.discipline === discipline &&
        registration.player.license === user?.license
      );
    });
  }

  return (
    <Link to={`/m/calendar/${tournament.id}`}>
      <div
        className={twMerge(
          MTournamentCardStyle.base,
          MTournamentCardStyle[variant],
          style
        )}
      >
        <div className={MTournamentCardStyle.row}>
          <MIcon
            bg={variantStyles[variant].iconBg}
            color={variantStyles[variant].iconColor}
            icon={faSun}
          />
          <div>
            <MText color={variantStyles[variant].text} style="mb-1">
              {tournament.location}
            </MText>
            <MText
              type="small"
              color={variantStyles[variant].smallText}
            >
              {format(new Date(tournament.startDate), "dd/MM ")}
              au
              {format(new Date(tournament.endDate), " dd/MM")}
            </MText>
          </div>
        </div>

        <MText
          style="flex-1"
          type="accent"
          color={variantStyles[variant].text}
        >
          {tournament.name}
        </MText>

        <div className={MTournamentCardStyle.tags}>
          <MTag variant={variantStyles[variant].tag}>
            {tournament.minLevel} | {tournament.maxLevel}
          </MTag>
          {tournament.disciplines.map((discipline) => (
            <MTag
              key={discipline}
              variant={
                hasRegistered(discipline)
                  ? variantStyles[variant].tagActive
                  : variantStyles[variant].tag
              }
            >
              {discipline}
            </MTag>
          ))}
        </div>
      </div>
    </Link>
  );
}
