export enum Discipline {
  SH = "SH",
  SD = "SD",
  DH = "DH",
  DD = "DD",
  DM = "DM",
}

export const DISCIPLINES = [
  Discipline.DD,
  Discipline.DH,
  Discipline.DM,
  Discipline.SD,
  Discipline.SH,
] as const;
