import { MongoClient } from "mongodb";

export async function migrate() {
  const argDb = process.argv.pop();
  if (!argDb || !argDb.startsWith("--db=")) {
    console.error("Cannot run migration: no argument --db found");
    process.exit(1);
  }
  const uri = argDb.split("--db=")[1];

  let client;
  try {
    console.log("--- Migration starting ---");
    client = new MongoClient(uri);
    const database = client.db("db");
    // ==========================
    // ===== MIGRATION CODE =====
    // ==========================
    const collTournaments = database.collection("Tournament");

    const tournaments = collTournaments.find();
    for await (const tournament of tournaments) {
      const prices = [
        tournament.priceOne,
        tournament.priceTwo,
        tournament.priceThree,
      ].filter((price) => Number.isInteger(price) && price > 0);

      await collTournaments.updateOne(
        { _id: tournament._id },
        {
          $set: {
            prices,
          },
          $unset: {
            priceOne: "",
            priceTwo: "",
            priceThree: "",
          },
        },
      );
    }
    // =========================
    // ===== END MIGRATION =====
    // =========================
    console.log("--- Migration done ---");
  } catch (e) {
    console.error("--- Migration failed ---");
    console.error(e);
  } finally {
    if (client) {
      await client.close();
    }
    process.exit(1);
  }
}

migrate().catch(console.dir);
