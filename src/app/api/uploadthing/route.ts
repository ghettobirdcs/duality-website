import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export default Next.js API route handler
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
