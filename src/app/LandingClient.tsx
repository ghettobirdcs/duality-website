"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/Spinner";

export default function LandingClient() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoToDashboard = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  // Show spinner while Clerk is loading (prevents signed-out flash)
  if (!isLoaded) {
    return (
      <div className="fullpage-center">
        <div className="landing-box">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <>
      {isSignedIn && (
        <div className="user-button-topright">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: { width: 48, height: 48 } },
            }}
          />
        </div>
      )}
      <div className="fullpage-center">
        <div className="landing-box">
          <h1>
            {isSignedIn
              ? `Welcome, ${user?.username ?? user?.firstName ?? "user"}`
              : "Welcome to the Duality HUB"}
          </h1>
          {!isSignedIn ? (
            <SignInButton className="dashboard-btn" mode="modal" />
          ) : (
            <button
              className="dashboard-btn"
              onClick={handleGoToDashboard}
              disabled={loading}
              style={{ position: "relative" }}
            >
              {loading ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Spinner />
                </span>
              ) : (
                "Go to Dashboard"
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
