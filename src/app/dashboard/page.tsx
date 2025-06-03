import { db } from "@/db/client";
import { players } from "@/db/schema";
import { eq } from "drizzle-orm";
import { UserButton } from "@clerk/nextjs";
import { userHasATeamRole } from "@/utils/discord";

export default async function Dashboard() {
  const isATeam = await userHasATeamRole(discordId);

  if (isATeam) {
    // Add to db if not existing already
  }

  // Example: Query all players
  const playerList = await db.select().from(players);

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome to your team dashboard!</p>
      <h2>Players</h2>
      <ul>
        {playerList.map((player) => (
          <li key={player.id}>
            {player.name} (Discord ID: {player.discordId}){" "}
            {player.role ? `- ${player.role}` : ""}
          </li>
        ))}
      </ul>
      <UserButton />
    </main>
  );
}
