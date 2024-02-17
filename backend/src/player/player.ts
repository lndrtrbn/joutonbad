import { Prisma } from "@prisma/client";

import { trimLicense } from "src/utils/license";

export type PlayerCreatePayload = Pick<
  Prisma.PlayerCreateInput,
  "name" | "lastname" | "license" | "club"
>;

export type PlayerUpdatePayload = Pick<
  Prisma.PlayerUpdateInput,
  "favoriteDevice"
>;

export type CsvPlayer = [licence: string, name: string, firstname: string];

export function csvPlayerToCreatePayload(csv: CsvPlayer): PlayerCreatePayload {
  return {
    license: trimLicense(csv[2]),
    lastname: csv[0],
    name: csv[1],
  };
}
