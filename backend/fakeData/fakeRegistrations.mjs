import { faker } from "@faker-js/faker";

export function generateRegistrations(
  quantity,
  tournaments,
  players,
) {
  const registrations = [];
  for (let i = 0; i < quantity; i++) {
    const tournament =
      tournaments[faker.number.int({ max: tournaments.length - 1 })];
    const playerIndex = faker.number.int({ max: players.length - 1 });
    const player = players[playerIndex];
    const partnerData = players[(playerIndex + 1) % players.length];
    const discipline = faker.helpers.arrayElement(
      tournament.disciplines,
    );
    let partner;
    if (
      discipline === "DD" ||
      discipline === "DH" ||
      discipline === "DM"
    ) {
      partner = {
        club: "REC",
        lastname: partnerData.lastname,
        name: partnerData.name,
        license: partnerData.license,
        level: faker.helpers.arrayElement([
          "P10",
          "D9",
          "D8",
          "D7",
          "R6",
          "R5",
        ]),
      };
    }

    const isCancelled = faker.datatype.boolean(0.2);
    let cancelled = null;
    if (isCancelled) {
      cancelled = faker.animal.bird();
    }

    registrations.push({
      cancelled,
      createdAt: new Date(),
      updatedAt: new Date(),
      sent: faker.datatype.boolean(),
      discipline,
      level: faker.helpers.arrayElement([
        "P10",
        "D9",
        "D8",
        "D7",
        "R6",
        "R5",
      ]),
      tournamentId: tournament._id,
      playerId: player._id,
      partner,
    });
  }
  return registrations;
}
