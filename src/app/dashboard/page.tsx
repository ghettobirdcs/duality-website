import { Suspense } from "react";
import DashboardClient from "./DashboardClient";
import Spinner from "@/components/Spinner";
import { db } from "@/db/client";
import { players } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    // Clerk middleware should handle redirect, but fallback just in case
    return (
      <div className="fullpage-center">
        <div className="header-box">Please sign in.</div>
      </div>
    );
  }

  const playerList = await db.select().from(players);

  return (
    <Suspense
      fallback={
        <div className="fullpage-center">
          <div className="header-box">
            <Spinner />
          </div>
        </div>
      }
    >
      <DashboardClient playerList={playerList} />
    </Suspense>
  );
}
