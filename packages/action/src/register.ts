"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn } from "@acme/auth";
import { env } from "@acme/env";
import { getBaseUrl } from "@acme/util";

export const registerAction = async (formData: FormData) => {
  const secretKey = env.RECAPTCHA_SECRET_KEY;
  const baseUrl = getBaseUrl("account");

  const { gRecaptchaToken, email, name, password } = JSON.parse(
    JSON.stringify(Object.fromEntries(formData)),
  ) as {
    email: string;
    name: string;
    password: string;
    gRecaptchaToken: string;
  };

  const recaptchaHeaders = new Headers();
  recaptchaHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const recaptchaFormData = `secret=${secretKey}&response=${gRecaptchaToken}`;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: recaptchaHeaders,
      body: recaptchaFormData,
    });
    const resBody = (await res.json()) as {
      success: boolean;
      challenge_ts: string;
      hostname: string;
      score: number;
    };

    if (!resBody?.success && resBody?.score <= 0.5) {
      console.log("fail: resBody.score:", resBody.score);
      throw new Error("Failed: ReCaptcha"); // Throw error
    }
    await signIn("credentials", {
      email,
      name,
      password,

      redirect: false,
    });

    redirect(baseUrl + "/auth/verify-email/sent");
  } catch (error) {
    console.log("recaptcha error:", error);
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
