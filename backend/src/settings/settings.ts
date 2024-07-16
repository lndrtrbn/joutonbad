import { Prisma } from "@prisma/client";

export type SettingsCreatePayload = Pick<
  Prisma.PlateformSettingsCreateInput,
  "clubPart" | "history"
>;

export type SettingsUpdatePayload = Pick<
  Prisma.PlateformSettingsUpdateInput,
  "clubPart"
>;
