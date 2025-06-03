"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  // Extract Discord username if available
  let discordUsername: string | null = null;
  if (isSignedIn && user?.externalAccounts) {
    const discord = user.externalAccounts.find(
      (acc) => acc.provider === "oauth_discord"
    );
    discordUsername = discord?.username || null;
  }

  return (
    <>
      {isSignedIn && (
        <div className="user-button-topright">
          <UserButton
            appearance={{
              elements: { avatarBox: { width: 48, height: 48 } }
            }}
            afterSignOutUrl="/"
          />
        </div>
      )}
      <div className="fullpage-center">
        <div className="header-box">
          <h1>
            {isSignedIn
              ? `Welcome, ${discordUsername ?? user?.username ?? user?.firstName ?? "user"}`
              : "Welcome to the Duality HUB"}
          </h1>
        </div>
        {!isSignedIn ? (
          <SignInButton />
        ) : (
          <button
            className="dashboard-btn"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </>
  );
}
