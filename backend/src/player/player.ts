import { Prisma } from "@prisma/client";

import { trimLicense } from "src/utils/license";

export type PlayerCreatePayload = Pick<
  Prisma.PlayerCreateInput,
  "name" | "lastname" | "license" | "club"
>;

export type PlayerUpdatePayload = Pick<
  Prisma.PlayerUpdateInput,
  "favoriteDevice" | "favoriteColor"
>;

export type CsvPlayer = [lastname: string, name: string, licence: string];

export function csvPlayerToCreatePayload(csv: CsvPlayer): PlayerCreatePayload {
  return {
    license: trimLicense(csv[2]),
    lastname: csv[0],
    name: csv[1],
  };
}
