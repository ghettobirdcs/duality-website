"use client";
import { useState, useRef, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { isAdmin } from "@/lib/utils";
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [roleInput, setRoleInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState(playerList);

  // TODO: Restrict backend as well
  const canEdit = isAdmin(user?.externalAccounts[0]?.providerUserId);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);


  const handleEditClick = (player: Player) => {
    setEditingId(player.id);
    setRoleInput("");
  }

  const handleSave = async (playerId: number) => {
    setSavingId(playerId);
    setEditingId(null);
    setLoading(true);
    const res = await fetch(`/api/players/${playerId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: roleInput }),
    });
    if (res.ok) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === playerId ? { ...p, role: roleInput } : p
        )
      );
      setEditingId(null);
    }
    setSavingId(null);
    setLoading(false);
  };

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
              {players.map((player) => (
                <li
                  className="dashboard__container--item"
                  key={player.id}
                  onClick={() => handleEditClick(player)}
                >
                  {editingId === player.id && canEdit ? (
                    <div className="dashboard__container--role-change">
                      <input
                        ref={inputRef}
                        className="player__role--input"
                        value={roleInput}
                        onChange={(e) => setRoleInput(e.target.value)}
                        placeholder="Enter role"
                        disabled={loading}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSave(player.id);
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            setEditingId(null);
                            setRoleInput("");
                          }
                        }}
                      />
                      <button
                        className="player__role--button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave(player.id);
                        }}
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(null);
                          setRoleInput("");
                        }}
                        disabled={loading} 
                        className="player__role--button"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    savingId === player.id && loading ? (
                      <Spinner />
                    ) : (
                      <>
                        {player.role ? `${player.role} - ` : ""}
                        {player.discordUsername}
                      </>
                    )
                  )}
                </li>
              ))}
            </ul>
          </h2>
          <h2 className="dashboard__container">
            <ul className="dashboard__container--list">
              <li className="dashboard__title dashboard__container--title">
                Links
              </li>
              <li className="dashboard__container--item">
                <a href="https://www.faceit.com/en/teams/fdb9bba5-4cd5-4ff1-9ad6-8a42c6768132" target="_blank">
                  ESEA
                </a>
              </li>
              <li className="dashboard__container--item">
                <a href="https://pracc.com/team" target="_blank">
                  Pracc.com
                </a>
              </li>
              <li className="dashboard__container--item">
                <a href="https://www.youtube.com/@upstartgaming4433" target="_blank">
                  Upstart - YouTube
                </a>
              </li>
              <li className="dashboard__container--item">
                <a href="https://www.youtube.com/@Jellocs" target="_blank">
                  Jello - YouTube
                </a>
              </li>
            </ul>
          </h2>
          <h2 className="dashboard__container schedule">
            <ul className="dashboard__container--list">
              <li className="dashboard__title dashboard__container--title">
                Schedule
              </li>
              <li className="text-xl">Tuesday 9:30PM EST</li>
              <li className="text-xl">Thursday 9:30PM EST</li>
            </ul>
          </h2>
        </div>
      </div>
    </>
  );
}
