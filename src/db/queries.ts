import { db } from "./client";
import { maps, setups } from "./schema";
import { eq } from "drizzle-orm";

export async function getMapWithSetups(slug: string) {
  const [map] = await db.select().from(maps).where(eq(maps.slug, slug));

  if (!map) return null;

  const mapSetups = await db
    .select()
    .from(setups)
    .where(eq(setups.mapId, map.id));

  return {
    ...map,
    setups: mapSetups,
  };
}

export async function updateSetup(
  setupId: number,
  data: { description: string; imageUrl: string },
) {
  await db
    .update(setups)
    .set({
      description: data.description,
      imageUrl: data.imageUrl,
    })
    .where(eq(setups.id, setupId));
}
