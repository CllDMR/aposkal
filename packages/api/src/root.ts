import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { tenantRouter } from "./router/tenant";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  tenant: tenantRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
