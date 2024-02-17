import {
  Discipline,
  Level,
  Partner,
  Player,
  Prisma,
  Registration,
  Tournament,
} from "@prisma/client";

export type RegistrationCreatePayload = {
  discipline: Discipline;
  level: Level;
  tournamentId: string;
  playerLicense: string;
  partner?: Partner;
  registerPartner?: boolean;
};

export type RegistrationUpdatePayload = Pick<
  Prisma.RegistrationUpdateInput,
  "sent" | "partner" | "cancelled"
>;

export type FullRegistration = Registration & {
  player: Player;
  tournament: Tournament;
};
