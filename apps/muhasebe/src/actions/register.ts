"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn } from "~/app/api/auth/[...nextauth]/route";
import { getBaseUrl } from "~/utils/get-base-url";

export const registerAction = async (formData: FormData) => {
  const baseUrl = getBaseUrl();

  const { email, name, password } = JSON.parse(
    JSON.stringify(Object.fromEntries(formData)),
  ) as {
    email: string;
    name: string;
    password: string;
  };
  try {
    await signIn("credentials", {
      email,
      name,
      password,

      redirect: false,
    });

    redirect(baseUrl + "/auth/verify-email/sent");
  } catch (error) {
    // Handle auth errors
    if (error instanceof AuthError) {
      redirect(
        baseUrl +
          "/auth/register" +
          "?error=" +
          error.name +
          "&message=" +
          error.message,
      );
    }
    throw error; // Rethrow all other errors
  }
};
