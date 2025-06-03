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
      <div className="dashboard">
        <h1 className="dashboard__title">Dashboard</h1>
        <h2 className="dashboard__container">
          <ul className="dashboard__container--list maps">
            <li className="dashboard__container--item">Mirage</li>
            <li className="dashboard__container--item">Dust2</li>
            <li className="dashboard__container--item">Inferno</li>
            <li className="dashboard__container--item">Ancient</li>
            <li className="dashboard__container--item">Anubis</li>
            <li className="dashboard__container--item">Vertigo</li>
            <li className="dashboard__container--item">Nuke</li>
          </ul>
        </h2>
        <div className="dashboard--secondary">
          <h2 className="dashboard__container">
            <ul className="dashboard__container--list">
              {playerList.map((player) => (
                <li className="dashboard__container--item" key={player.id}>
                  {player.role ? `${player.role} - ` : ""}
                  {player.name}
                </li>
              ))}
            </ul>
          </h2>
          <h2 className="dashboard__container">
            <ul className="dashboard__container--list">
              <li className="dashboard__title dashboard__container--title">
                Notes
              </li>
              <li className="dashboard__container--item">
                *Link to .txt file*
              </li>
            </ul>
          </h2>
          <h2 className="dashboard__container schedule">
            <ul className="dashboard__container--list">
              <li className="dashboard__title dashboard__container--title">
                Schedule
              </li>
              <li>Tuesday 9:30PM EST - Practice</li>
              <li>Thursday 9:30PM EST - Scrim</li>
            </ul>
          </h2>
        </div>
      </div>
    </>
  );
}
