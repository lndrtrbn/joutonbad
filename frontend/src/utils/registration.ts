import * as z from "zod";

import { Player } from "./player";
import { LEVELS, Level } from "./level";
import { Tournament } from "./tournament";
import { DISCIPLINES, Discipline } from "./discipline";

export const RegistrationSingleSchema = z.object({
  discipline: z.enum(DISCIPLINES),
  rank: z.enum(LEVELS),
});
export type RegistrationSingleInputs = z.infer<
  typeof RegistrationSingleSchema
>;

export const RegistrationDoubleSchema = z.object({
  discipline: z.enum(DISCIPLINES),
  rank: z.enum(LEVELS),
  partnerName: z.string().min(1),
  partnerLastname: z.string().min(1),
  partnerLicense: z.string().min(1),
  partnerClub: z.string().min(1),
  partnerRank: z.enum(LEVELS),
  registerPartner: z.boolean(),
});
export type RegistrationDoubleInputs = z.infer<
  typeof RegistrationDoubleSchema
>;

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
  return filterByDiscipline(registrations, [
    Discipline.SD,
    Discipline.SH,
  ]);
}

export function filterDouble(registrations?: Registration[]) {
  return filterByDiscipline(registrations, [
    Discipline.DD,
    Discipline.DH,
  ]);
}

export function filterMixte(registrations?: Registration[]) {
  return filterByDiscipline(registrations, [Discipline.DM]);
}
