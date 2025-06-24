import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/utils";

const f = createUploadthing();

export const ourFileRouter = {
  setupImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) throw new Error("Unauthorized");

      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const discordId = user.publicMetadata?.discordId as string;

      if (!isAdmin(discordId)) throw new Error("Forbidden");

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { uploadedUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
