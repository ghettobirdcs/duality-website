"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Spinner from "@/components/Spinner";

interface Player {
  id: number;
  name: string;
  discordId: string;
  role?: string | null;
}

export default function DashboardClient({
  playerList,
}: {
  playerList: Player[];
}) {
  const { user } = useUser();

  return (
    <>
      <div className="user-button-topright">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: { avatarBox: { width: 48, height: 48 } },
          }}
        />
      </div>
      <div className="fullpage-center">
        <div className="header-box">
          <h1>Dashboard</h1>
          <h2>Players</h2>
          <ul>
            {playerList.map((player) => (
              <li key={player.id}>
                {player.name} (Discord ID: {player.discordId})
                {player.role ? ` - ${player.role}` : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
