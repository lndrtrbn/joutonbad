import { MongoClient } from "mongodb";
import { generateTournaments } from "./fakeTournaments.mjs";
import { generateRegistrations } from "./fakeRegistrations.mjs";

async function fakeData() {
  const args = process.argv.slice(2);
  const argDb = args.find((arg) => arg.startsWith("--db="));
  const argTournamentsNb = args.find((arg) => arg.startsWith("--t="));
  const argRegistrationsNb = args.find((arg) => arg.startsWith("--r="));

  if (!argDb || !argDb.startsWith("--db=")) {
    console.error("Cannot run fake import: no argument --db found");
    process.exit(1);
  }

  const uri = argDb.split("--db=")[1];
  const tournamentsNb = argTournamentsNb?.split("--t=")[1] ?? 0;
  const registrationsNb = argRegistrationsNb?.split("--r=")[1] ?? 0;

  let client;
  try {
    console.log("--- Fake data import starting ---");
    client = new MongoClient(uri);
    const database = client.db("db");
    const collTournaments = database.collection("Tournament");
    const collPlayers = database.collection("Player");
    const collRegistrations = database.collection("Registration");

    if (tournamentsNb > 0) {
      await collTournaments.insertMany(generateTournaments(tournamentsNb), {
        ordered: true,
      });
    }

    if (registrationsNb > 0) {
      const tournaments = await collTournaments.find().toArray();
      const players = await collPlayers.find().toArray();

      await collRegistrations.insertMany(
        generateRegistrations(registrationsNb, tournaments, players),
        {
          ordered: true,
        },
      );
    }

    console.log("--- Fake data import done ---");
  } catch (e) {
    console.error("--- Fake data import failed ---");
    console.error(e);
  } finally {
    if (client) {
      await client.close();
    }
    process.exit(1);
  }
}

fakeData().catch(console.dir);
