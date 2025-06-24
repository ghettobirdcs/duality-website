"use server";
import { updateSetup as updateSetupDb } from "@/db/queries";

export async function updateSetup(
  setupId: number,
  data: { mapId: number; side: string; description: string; imageUrl: string },
) {
  await updateSetupDb(setupId, data);
}
