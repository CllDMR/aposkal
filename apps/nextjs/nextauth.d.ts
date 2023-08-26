import type { DefaultJWT } from "@auth/core/jwt";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      sub: string;
      ti: string;
      tn: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    ti: string;
    tn: string;
  }
}
