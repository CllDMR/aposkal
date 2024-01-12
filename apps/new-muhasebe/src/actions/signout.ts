"use server";

import { signOut } from "@acme/auth";

export const signOutAction = async () => {
  await signOut({ redirect: false });
};
