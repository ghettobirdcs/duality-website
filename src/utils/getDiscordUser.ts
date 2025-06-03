import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getDiscordUser() {
  const { userId } = auth();
  if (!userId) return null;

  const user = await clerkClient.users.getUser(userId);

  // Find the Discord external account, if any
  const discordAccount = user.externalAccounts.find(
    (acc) => acc.provider === "oauth_discord"
  );

  return {
    user,
    discordId: discordAccount?.providerUserId ?? null,
    discordUsername: discordAccount?.username ?? null,
  };
}
