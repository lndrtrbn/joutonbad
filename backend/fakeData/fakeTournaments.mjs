import { faker } from "@faker-js/faker";

export function generateTournaments(quantity) {
  const tournaments = [];
  for (let i = 0; i < quantity; i++) {
    const startDate = faker.date.soon({ days: 90 });
    const endDate = faker.date.soon({
      days: 1,
      refDate: startDate.toISOString(),
    });
    tournaments.push({
      name: `Tournoi ${faker.music.songName()}`,
      location: faker.location.city(),
      startDate,
      endDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      disciplines: faker.helpers.arrayElements(["SH", "SD", "DH", "DD", "DM"], {
        min: 2,
        max: 4,
      }),
      maxLevel: faker.helpers.arrayElement(["R5", "R4", "N3", "N2", "N1"]),
      minLevel: faker.helpers.arrayElement(["P10", "P11", "P12", "D9"]),
      prices: [
        faker.number.int({ min: 10, max: 14 }),
        faker.number.int({ min: 18, max: 22 }),
      ],
      links: [],
      inChargeId: "667018a1956cc6cd66f2b343",
      freezed: false,
      nocturne: faker.datatype.boolean(),
    });
  }
  return tournaments;
}
