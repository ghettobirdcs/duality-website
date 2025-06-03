"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function LandingClient() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

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
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
    </>
  );
}
