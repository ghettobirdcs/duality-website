import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome to the database</p>
      <div>
        <UserButton />
      </div>
    </main>
  );
}
