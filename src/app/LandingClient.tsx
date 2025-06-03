"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface LandingClientProps {
  userData: {
    user: {
      username?: string | null;
      firstName?: string | null;
    };
    discordId?: string | null;
    discordUsername?: string | null;
  } | null;
}

export default function Home({ userData }: LandingClientProps) {
  const router = useRouter();
  const isSignedIn = !!userData;

  if (userData) {
    const { discordUsername } = userData;
  }

  return (
    <>
      {isSignedIn && (
        <div className="user-button-topright">
          <UserButton
            appearance={{
              elements: { avatarBox: { width: 48, height: 48 } },
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
