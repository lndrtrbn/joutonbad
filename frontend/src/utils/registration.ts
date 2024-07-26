import { Player } from "./player";
import { Level } from "./level";
import { Tournament } from "./tournament";
import { Discipline } from "./discipline";

export type Registration = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  discipline: Discipline;
  level: Level;
  sent: boolean;
  player: Player;
  tournament?: Tournament;
  cancelled?: string;
  partner?: {
    name: string;
    lastname: string;
    license: string;
    club: string;
    level: Level;
  };
};

export function filterByDiscipline(
  registrations?: Registration[],
  disciplines?: Discipline[],
) {
  return (registrations ?? []).filter((reg) =>
    (disciplines ?? []).includes(reg.discipline),
  );
}

export function filterSingle(registrations?: Registration[]) {
  return filterByDiscipline(registrations, [Discipline.SD, Discipline.SH]);
}

export function filterDouble(registrations?: Registration[]) {
  return filterByDiscipline(registrations, [Discipline.DD, Discipline.DH]);
}

export function filterMixte(registrations?: Registration[]) {
  return filterByDiscipline(registrations, [Discipline.DM]);
}
