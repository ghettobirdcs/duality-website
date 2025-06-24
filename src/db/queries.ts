"use server";
import { db } from "./client";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/utils";
import { maps, setups } from "./schema";
import { auth, clerkClient } from "@clerk/nextjs/server";

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
  setupId: number | undefined,
  data: { mapId: number; side: string; description: string; imageUrl: string },
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const discordId = user.publicMetadata?.discordId as string;

  if (!isAdmin(discordId)) throw new Error("Forbidden");

  if (setupId) {
    // Update existing setup
    await db
      .update(setups)
      .set({
        description: data.description,
        imageUrl: data.imageUrl,
      })
      .where(eq(setups.id, setupId));
  } else {
    // Otherwise, insert a new setup
    await db.insert(setups).values({
      mapId: data.mapId,
      side: data.side,
      description: data.description,
      imageUrl: data.imageUrl,
    });
  }
}
