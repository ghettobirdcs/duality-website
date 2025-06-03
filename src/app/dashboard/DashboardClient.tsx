"use client";
import { db } from "@/db/client";
import { players } from "@/db/schema";
import { eq } from "drizzle-orm";
import { UserButton } from "@clerk/nextjs";
import { userHasATeamRole } from "@/utils/discord";

interface DashboardClientProps {
  userData: {
    user: {
      username?: string | null;
      firstName?: string | null;
    };
    discordId?: string | null;
    discordUsername?: string | null;
  } | null;
}

export default function DashboardClient({ userData }: DashboardClientProps) {
  if (!userData) {
    return <>Please sign in</>;
  }

  const { discordId } = userData;
  // TODO: const isATeam = await userHasATeamRole(discordId);
  // We cannot get this inside of a client component

  if (isATeam) {
    // Add to db if not existing already
  }

  // Example: Query all players
  // TODO: const playerList = await db.select().from(players);
  // same thing here

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
