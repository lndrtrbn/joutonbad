export enum Level {
  NC = "NC",
  P12 = "P12",
  P11 = "P11",
  P10 = "P10",
  D9 = "D9",
  D8 = "D8",
  D7 = "D7",
  R6 = "R6",
  R5 = "R5",
  R4 = "R4",
  N3 = "N3",
  N2 = "N2",
  N1 = "N1",
}

export const LEVELS = [
  Level.NC,
  Level.P12,
  Level.P11,
  Level.P10,
  Level.D9,
  Level.D8,
  Level.D7,
  Level.R6,
  Level.R5,
  Level.R4,
  Level.N3,
  Level.N2,
  Level.N1,
] as const;

export function subsetLevels(min: Level, max: Level) {
  const minIndex = LEVELS.indexOf(min);
  const maxIndex = LEVELS.indexOf(max);

  return LEVELS.slice(minIndex, maxIndex + 1);
}
