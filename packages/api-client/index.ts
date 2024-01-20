import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@acme/api";

export const api = createTRPCReact<AppRouter>();
