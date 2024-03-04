import { fr } from "date-fns/locale";
import { compareAsc, format } from "date-fns";

import { LEVELS, Level } from "./level";
import { Player } from "./player";
import { Discipline } from "./discipline";
import { Registration } from "./registration";

export type Tournament = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  prices: number[];
  minLevel: Level;
  maxLevel: Level;
  disciplines: Discipline[];
  links: Link[];
  registrations: Registration[];
  inCharge: Player;
  freezed?: boolean;
};

export type Link = {
  name: string;
  url: string;
};

export type TournamentList = {
  month: string;
  tournaments: Tournament[];
}[];

export function groupByMonth(
  tournaments: Tournament[],
): TournamentList {
  const newList: TournamentList = [];
  byStartDate(tournaments).forEach((tournament) => {
    const month = format(
      new Date(tournament.startDate),
      "MMMM yyyy",
      {
        locale: fr,
      },
    );

    const monthList = newList.find((item) => item.month === month);
    if (monthList) {
      monthList.tournaments.push(tournament);
    } else {
      newList.push({
        month,
        tournaments: [tournament],
      });
    }
  });
  return newList;
}

export function filterDiscipline(
  discipline?: Discipline,
  tournaments?: Tournament[],
) {
  return (tournaments ?? []).filter((tournament) => {
    return !discipline || tournament.disciplines.includes(discipline);
  });
}

export function filterLevel(
  minLevel?: Level,
  maxLevel?: Level,
  tournaments?: Tournament[],
) {
  const min = LEVELS.indexOf(minLevel ?? Level.NC);
  const max = LEVELS.indexOf(maxLevel ?? Level.N1);

  return (tournaments ?? []).filter((tournament) => {
    return (
      LEVELS.indexOf(tournament.minLevel) >= min &&
      LEVELS.indexOf(tournament.maxLevel) <= max
    );
  });
}

export function filterToCome(tournaments?: Tournament[]) {
  const now = new Date().setHours(0, 0, 0, 0);
  return (tournaments ?? []).filter((tournament) => {
    const date = new Date(tournament.startDate);
    return compareAsc(now, date) <= 0;
  });
}

export function filterPast(tournaments?: Tournament[]) {
  const now = new Date().setHours(0, 0, 0, 0);
  return (tournaments ?? []).filter((tournament) => {
    const date = new Date(tournament.startDate);
    return compareAsc(now, date) > 0;
  });
}

export function byCreatedDate(tournaments?: Tournament[]) {
  return (tournaments ?? []).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime(),
  );
}

export function byStartDate(tournaments?: Tournament[]) {
  return (tournaments ?? []).sort(
    (a, b) =>
      new Date(a.startDate).getTime() -
      new Date(b.startDate).getTime(),
  );
}
