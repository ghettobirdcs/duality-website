"use client";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect, useState } from "react";

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
  const [hydratedUser, setHydratedUser] = useState(userData);

  useEffect(() => {
    fetch("/api/discord-info")
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setHydratedUser({
            user: {
              username: data.username,
              firstName: data.firstName,
            },
            discordId: data.discordId,
            discordUsername: data.discordUsername,
          });
        }
      });
  }, []);

  const isSignedIn = !!hydratedUser?.discordId;
  const displayName =
    hydratedUser?.discordUsername ||
    hydratedUser?.user.username ||
    hydratedUser?.user.firstName ||
    "user";
  const discordId = hydratedUser?.discordId ?? "Not linked";

  return (
    <>
      <SignedIn>
        <div className="user-button-topright">
          <UserButton
            appearance={{
              elements: { avatarBox: { width: 48, height: 48 } },
            }}
            afterSignOutUrl="/"
          />
        </div>
        <div className="fullpage-center">
          <div className="header-box">
            <h1>Welcome, {displayName}</h1>
            <p>Your Discord ID: {discordId}</p>
          </div>
          {/* Your dashboard content goes here */}
        </div>
      </SignedIn>
      <SignedOut>
        <div className="fullpage-center">
          <div className="header-box">
            <h1>Please sign in to view your dashboard.</h1>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
