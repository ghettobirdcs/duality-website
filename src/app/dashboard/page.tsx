import { Suspense } from "react";
import DashboardClient from "./DashboardClient";
import Spinner from "@/components/Spinner";
import { db } from "@/db/client";
import { players } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { updateDiscordId } from "@/lib/update-clerk-metadata";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="fullpage-center">
        <div className="header-box">Please sign in.</div>
      </div>
    );
  }

  // Fetch the current Clerk user
  const user = await currentUser();

  const discordAccount = user?.externalAccounts?.find(
    (acc) => acc.provider === "oauth_discord",
  );
  const discordId = discordAccount?.externalId;
  const discordUsername =
    discordAccount?.username || user?.username || user?.firstName || "unknown";
  const discordAvatar = user?.imageUrl || null;

  // TODO: Only insert players on A Team
  // Insert player if not already in DB
  if (discordId) {
    const existing = db
      .select()
      .from(players)
      .where(eq(players.discordId, discordId))
      .get();
    if (!existing) {
      await db.insert(players).values({
        discordId,
        discordUsername,
        discordAvatar,
      });

      await updateDiscordId(userId, discordId);
    }
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
