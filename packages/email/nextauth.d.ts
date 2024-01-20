import type { DefaultJWT as aDefaultJWT } from "@auth/core/jwt";
import type { DefaultSession as aDefaultSession } from "@auth/core/types";
import type { DefaultSession as nDefaultSession } from "next-auth";
import type { JWT as nDefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      ti: string;
      tn: string;
      role: string;
    } & nDefaultSession["user"];
  }
  // interface User extends nDefaultSession.user {
  //   role: string;
  // }
  interface JWT extends nDefaultJWT {
    ti: string;
    tn: string;
    role: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends nDefaultJWT {
    ti: string;
    tn: string;
    role: string;
  }
}

declare module "@auth/core" {
  interface Session {
    user: {
      id: string;
      ti: string;
      tn: string;
      role: string;
    } & aDefaultSession["user"];
  }
  // interface User extends aDefaultSession.user {
  //   role: string;
  // }
  interface JWT extends aDefaultJWT {
    ti: string;
    tn: string;
    role: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends aDefaultJWT {
    ti: string;
    tn: string;
    role: string;
  }
}
