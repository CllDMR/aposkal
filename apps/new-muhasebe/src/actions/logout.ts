"use server";

import { signOut } from "@acme/auth";

export const logOutAction = async () => {
  await signOut({
    redirectTo: "/",
  });
};
