import { getDiscordUser } from "@/utils/getDiscordUser";
import LandingClient from "./LandingClient";

export default async function Home() {
  const userData = await getDiscordUser();
  return <LandingClient userData={userData} />;
}
