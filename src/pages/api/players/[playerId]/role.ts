import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/utils";
import { db } from "@/db/client";
import { players } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { playerId } = req.query;

  // You may want to check playerId is a string and parseInt-able
  const playerIdNum = Array.isArray(playerId) ? playerId[0] : playerId;
  if (!playerIdNum || isNaN(Number(playerIdNum))) {
    res.status(400).json({ error: "Invalid playerId" });
    return;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const discordId = user.publicMetadata?.discordId as string;

  if (!isAdmin(discordId)) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  // Parse the body (Next.js automatically parses JSON if Content-Type is set)
  const { role } = req.body;

  if (typeof role !== "string" || !role) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  await db
    .update(players)
    .set({ role })
    .where(eq(players.id, Number(playerIdNum)));

  res.status(200).json({ success: true });
}
