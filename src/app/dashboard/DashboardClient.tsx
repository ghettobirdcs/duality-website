"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Spinner from "@/components/Spinner";
import Link from "next/link";

interface Player {
  id: number;
  discordId: string;
  discordUsername: string;
  discordAvatar: string;
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
            <li className="dashboard__container--item">
              <Link href="/maps/mirage">Mirage</Link>
            </li>
            <li className="dashboard__container--item">
              <Link href="/maps/dust2">Dust2</Link>
            </li>
            <li className="dashboard__container--item">
              <Link href="/maps/inferno">Inferno</Link>
            </li>
            <li className="dashboard__container--item">
              <Link href="/maps/ancient">Ancient</Link>
            </li>
            <li className="dashboard__container--item">
              <Link href="/maps/anubis">Anubis</Link>
            </li>
            <li className="dashboard__container--item">
              <Link href="/maps/vertigo">Vertigo</Link>
            </li>
            <li className="dashboard__container--item">
              <Link href="/maps/nuke">Nuke</Link>
            </li>
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
              <li className="text-xl">Tuesday 9:30PM EST - Practice</li>
              <li className="text-xl">Thursday 9:30PM EST - Scrim</li>
            </ul>
          </h2>
        </div>
      </div>
    </>
  );
}
