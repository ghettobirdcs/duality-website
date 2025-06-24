import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/utils";
import { db } from "@/db/client";
import { players } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { playerId: string } },
): Promise<NextResponse> {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { playerId } = await params;

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const discordId = user.publicMetadata?.discordId as string;

  if (!isAdmin(discordId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { role } = await request.json();

  if (!playerId || typeof role !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  await db
    .update(players)
    .set({ role })
    .where(eq(players.id, Number(playerId)));

  return NextResponse.json({ success: true });
}
