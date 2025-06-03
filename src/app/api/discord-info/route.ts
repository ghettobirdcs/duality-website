import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const user = await clerkClient.users.getUser(userId);
  const discordAccount = user.externalAccounts.find(
    (acc) => acc.provider === "oauth_discord",
  );
  return NextResponse.json({
    discordId: discordAccount?.providerUserId ?? null,
    discordUsername: discordAccount?.username ?? null,
    username: user.username ?? null,
    firstName: user.firstName ?? null,
  });
}
