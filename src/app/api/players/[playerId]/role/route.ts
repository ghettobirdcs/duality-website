import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { players } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { playerId: string } }
) {
  const { role } = await req.json();
  const { playerId } = await params;
  if (!playerId || typeof role !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  await db
    .update(players)
    .set({ role })
    .where(eq(players.id, playerId));
  return NextResponse.json({ success: true });
}
