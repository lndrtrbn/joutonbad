import { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import Tag from "../Tag/Tag";
import TagList from "../TagList/TagList";
import { Tournament } from "../../utils/tournament";
import { Discipline } from "../../utils/discipline";
import TournamentCardStyle from "./TournamentCard.style";

type Props = {
  tournament: Tournament;
  registeredDisciplines?: Discipline[];
};

export default function TournamentCard({
  tournament,
  registeredDisciplines = [],
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={twMerge(TournamentCardStyle.base, TournamentCardStyle.hover)}
    >
      <Link to={`/tournoi/${tournament.id}`}>
        <div
          className={twMerge(
            TournamentCardStyle.meta,
            hovered && TournamentCardStyle.metaHover,
          )}
        >
          <p>{tournament.location}</p>
          <p>
            {format(new Date(tournament.startDate), "dd/MM ")}
            au
            {format(new Date(tournament.endDate), " dd/MM")}
          </p>
        </div>

        <p className={TournamentCardStyle.name}>{tournament.name}</p>

        <TagList>
          {tournament.disciplines.map((discipline) => (
            <Tag
              key={discipline}
              size="sm"
              active={registeredDisciplines.includes(discipline)}
            >
              {discipline}
            </Tag>
          ))}
        </TagList>

        <div className={TournamentCardStyle.tags}>
          <TagList>
            <Tag size="sm">{tournament.minLevel}</Tag>
            <span>à</span>
            <Tag size="sm">{tournament.maxLevel}</Tag>
          </TagList>
          {tournament.nocturne && <Tag size="sm">Nocturne</Tag>}
        </div>
      </Link>
    </div>
  );
}
