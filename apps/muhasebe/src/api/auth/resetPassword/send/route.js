import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmailResetPassword } from "@/lib/email";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  const body = await request.json();

  const email = body.email;

  if (!email) return false;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user)
    return NextResponse.json(
      { error: "E posta bulunamadı. E postanızı kontrol edin." },
      { status: 400 },
    );

  const changePasswordCode = uuidv4();

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      changePasswordCode,
    },
  });

  await sendEmailResetPassword(user.name, email, changePasswordCode);

  return NextResponse.json({ message: "Email gönderildi." }, { status: 200 });
}
