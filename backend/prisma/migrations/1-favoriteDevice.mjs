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
    const collPlayers = database.collection("Player");

    const players = collPlayers.find();
    for await (const player of players) {
      const favoriteDevice = player.favoriteDevice;
      if (!favoriteDevice) {
        await collPlayers.updateOne(
          { _id: player._id },
          {
            $set: {
              favoriteDevice: "desktop",
            },
          },
        );
      }
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
