// TODO: Make sure my bot has 'members' intent

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const GUILD_ID = process.env.DISCORD_GUILD_ID!;
const A_TEAM_ROLE_ID = process.env.DISCORD_A_TEAM_ROLE_ID!;

export async function userHasATeamRole(discordId: string): Promise<boolean> {
  const res = await fetch(
    `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}`,
    {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      },
      // GET request by default
    },
  );
  if (!res.ok) {
    // User not in server or bot lacks permissions
    return false;
  }
  const data = await res.json();
  return data.roles.includes(A_TEAM_ROLE_ID);
}
