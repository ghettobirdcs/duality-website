import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  setupImage: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file, metadata }) => {
      // TODO: You can save file.url and any other info to your DB here
      return { uploadedBy: "user" };
    },
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
