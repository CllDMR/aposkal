import type { JWT as JWT_ } from "@auth/core/jwt";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      ti: string;
      tn: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core" {
  interface Session {
    user: {
      id: string;
      ti: string;
      tn: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends JWT_ {
    ti: string;
    tn: string;
  }
}
