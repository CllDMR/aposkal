import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmailResetPasswordVerified } from "@/lib/email";
import { resetPasswordSchema } from "@/validationSchemas";
import bcrypt from "bcrypt";

export async function POST(request) {
  const body = await parseRequestBody(request, resetPasswordSchema);

  const user = await db.user.findUnique({
    where: {
      email: body.email,
      changePasswordCode: body.changePasswordCode,
      id: body.userId,
    },
  });

  if (!user)
    return NextResponse.json({ error: "Hatalı istek" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      hashedPassword,
      changePasswordCode: null,
    },
  });

  await sendEmailResetPasswordVerified(user.name, email);

  return NextResponse.json({ message: "Parola Değiştirildi" }, { status: 200 });
}
