"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LandingClient() {
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();

  // While Clerk is loading, show nothing or a spinner
  if (!isLoaded) return null;

  return (
    <div>
      <div className="user-button-topright">
        <SignedIn>
          <UserButton
            appearance={{
              elements: { avatarBox: { width: 48, height: 48 } },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
      </div>
      <div className="fullpage-center">
        <div className="header-box">
          <h1>
            <SignedIn>
              {`Welcome, ${user?.username ?? user?.firstName ?? "user"}`}
            </SignedIn>
            <SignedOut>Welcome to the Duality HUB</SignedOut>
          </h1>
        </div>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <button
            className="dashboard-btn"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
        </SignedIn>
      </div>
    </div>
  );
}
