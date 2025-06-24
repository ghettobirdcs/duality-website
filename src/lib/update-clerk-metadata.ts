import { clerkClient } from "@clerk/nextjs/server";

export async function updateDiscordId(userId: string, discordId: string) {
  const client = await clerkClient();
  await client.users.updateUser(userId, {
    publicMetadata: { discordId },
  });
}
