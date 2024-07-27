import { Player, Prisma, Registration, Tournament } from "@prisma/client";

export type TournamentCreatePayload = Pick<
  Prisma.TournamentCreateInput,
  | "disciplines"
  | "endDate"
  | "location"
  | "maxLevel"
  | "minLevel"
  | "name"
  | "startDate"
  | "prices"
  | "links"
  | "inCharge"
  | "freezed"
  | "nocturne"
>;

export type TournamentUpdatePayload = Pick<
  Prisma.TournamentUpdateInput,
  | "disciplines"
  | "endDate"
  | "location"
  | "maxLevel"
  | "minLevel"
  | "name"
  | "startDate"
  | "prices"
  | "links"
  | "inCharge"
  | "freezed"
  | "nocturne"
>;

export type FullTournament = Tournament & {
  registrations: Registration[];
  inCharge: Player;
};
