import { getDiscordUser } from "@/utils/getDiscordUser";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const userData = await getDiscordUser();
  return <DashboardClient userData={userData} />;
}
