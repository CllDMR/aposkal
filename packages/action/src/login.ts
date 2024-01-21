"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn } from "@acme/auth";
import { getBaseUrl } from "@acme/util";

export const loginAction = async (formData: FormData) => {
  const baseUrl = getBaseUrl("account");

  const { email, password } = JSON.parse(
    JSON.stringify(Object.fromEntries(formData)),
  ) as {
    email: string;
    password: string;
  };
  try {
    await signIn("credentials", {
      email,
      password,

      redirect: false,
    });

    redirect(baseUrl + "/auth/select-tenant");
  } catch (error) {
    // Handle auth errors
    if (error instanceof AuthError) {
      redirect(
        baseUrl +
          "/auth/login" +
          "?error=" +
          error.name +
          "&message=" +
          error.message,
      );
    }
    throw error; // Rethrow all other errors
  }
};
