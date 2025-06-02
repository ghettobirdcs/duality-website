import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HomeClient from "./HomeClient";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <HomeClient />;
}
