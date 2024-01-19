"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { AuthError } from "next-auth";

import { and, db, eq, schema } from "@acme/db";
import {
  sendEmailResetPassword,
  sendEmailResetPasswordVerified,
} from "@acme/email";
import { getBaseUrl } from "@acme/util";

export const changePasswordStartAction = async (formData: FormData) => {
  const baseUrl = getBaseUrl();

  const { email } = JSON.parse(
    JSON.stringify(Object.fromEntries(formData)),
  ) as {
    email: string;
  };
  try {
    const user = await db.query.user.findFirst({
      where: and(eq(schema.user.email, email)),
    });

    if (!user)
      throw new AuthError({
        type: "Credentials",
        message: "User not found.",
      });

    const changePasswordCode = nanoid();

    await db
      .update(schema.user)
      .set({
        changePasswordCode,
      })
      .where(eq(schema.user.id, user.id));

    await sendEmailResetPassword(user.name, user.email, changePasswordCode);

    redirect(baseUrl + "/auth/new-password/email-sent");
  } catch (error) {
    // Handle auth errors
    if (error instanceof AuthError) {
      redirect(
        baseUrl +
          "/auth/new-password/send-email" +
          "?error=" +
          error.name +
          "&message=" +
          error.message,
      );
    }
    throw error; // Rethrow all other errors
  }
};

export const confirmChangePasswordAction = async (formData: FormData) => {
  const baseUrl = getBaseUrl();

  const { email, changePasswordCode, userId, password, confirmPassword } =
    JSON.parse(JSON.stringify(Object.fromEntries(formData))) as {
      email: string;
      changePasswordCode: string;
      userId: string;
      password: string;
      confirmPassword: string;
    };
  try {
    if (password.trim() !== confirmPassword.trim())
      throw new AuthError({
        type: "Credentials",
        message: "ConfirmPassword and password are not equal.",
      });

    const user = await db.query.user.findFirst({
      where: and(
        eq(schema.user.email, email),
        eq(schema.user.changePasswordCode, changePasswordCode),
        eq(schema.user.id, userId),
      ),
    });

    if (!user)
      throw new AuthError({
        type: "Credentials",
        message: "User not found.",
      });

    // const hashedPassword = await hash(password, 10);
    const hashedPassword = "";

    await db
      .update(schema.user)
      .set({
        password: hashedPassword,
        changePasswordCode: null,
      })
      .where(eq(schema.user.id, user.id));

    await sendEmailResetPasswordVerified(user.name, user.email);

    redirect(baseUrl + "/");
  } catch (error) {
    // Handle auth errors
    if (error instanceof AuthError) {
      redirect(
        baseUrl +
          "/auth/new-password/email-verified" +
          "?error=" +
          error.name +
          "&message=" +
          error.message,
      );
    }
    throw error; // Rethrow all other errors
  }
};
