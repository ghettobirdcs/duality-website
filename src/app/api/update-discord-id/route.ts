import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { updateDiscordId } from "@/lib/update-clerk-metadata";

export async function POST(req: NextRequest) {
  const { discordId } = await req.json();
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await updateDiscordId(userId, discordId);

  return NextResponse.json({ success: true });
}
