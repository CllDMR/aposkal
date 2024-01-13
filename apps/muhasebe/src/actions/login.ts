"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn } from "~/app/api/auth/[...nextauth]/route";
import { getBaseUrl } from "~/utils/get-base-url";

export const loginAction = async (formData: FormData) => {
  const baseUrl = getBaseUrl();

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

    redirect(baseUrl + "/auth/select-company");
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
