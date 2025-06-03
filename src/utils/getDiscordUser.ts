import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getDiscordUser() {
  const { userId } = auth();
  if (!userId) return null;

  const user = await clerkClient.users.getUser(userId);

  const discordAccount = user.externalAccounts.find(
    (acc) => acc.provider === "oauth_discord",
  );

  return {
    user: {
      username: user.username ?? null,
      firstName: user.firstName ?? null,
    },
    discordId: discordAccount?.providerUserId ?? null,
    discordUsername: discordAccount?.username ?? null,
  };
}
