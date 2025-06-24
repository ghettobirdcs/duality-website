import { db } from "./client";
import { maps } from "./schema";
import { eq } from "drizzle-orm";

const mapList = [
  { name: "Dust2", slug: "dust2" },
  { name: "Mirage", slug: "mirage" },
  { name: "Inferno", slug: "inferno" },
  { name: "Ancient", slug: "ancient" },
  { name: "Anubis", slug: "anubis" },
  { name: "Vertigo", slug: "vertigo" },
  { name: "Nuke", slug: "nuke" },
];

async function seedMaps() {
  for (const map of mapList) {
    const existing = await db
      .select()
      .from(maps)
      .where(eq(maps.slug, map.slug));
    if (existing.length === 0) {
      await db.insert(maps).values(map);
      console.log(`Inserted map: ${map.name}`);
    } else {
      console.log(`Map already exists: ${map.name}`);
    }
  }
  console.log("Seeding complete!");
}

seedMaps()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
