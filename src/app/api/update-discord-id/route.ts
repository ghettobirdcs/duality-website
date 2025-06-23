import { NextRequest, NextResponse } from "next/server";
import { clerkClient, auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { discordId } = await req.json();
  const { userId } = await auth();
  const client = await clerkClient();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await client.users.updateUser(userId, {
    publicMetadata: { discordId },
  });

  return NextResponse.json({ success: true });
}
