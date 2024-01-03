import { NextResponse } from "next/server";
import { sendEmail } from "@/api/send-email/email";
import { resetPasswordSchema } from "@/validationSchemas";
import bcrypt from "bcrypt";
import { prisma } from "prismaClient";

export async function POST(request) {
  const body = await request.json();

  const validation = resetPasswordSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      changePasswordCode: body.changePasswordCode,
      id: body.userId,
    },
  });

  if (!user)
    return NextResponse.json({ error: "Hatalı istek" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      hashedPassword,
      changePasswordCode: null,
    },
  });

  const emailData = {
    // from: "",
    to: user.email,
    subject: "Şifreniz Değiştirildi",
    html: `<h1>Aposkal</h1>
          <p>Merhaba ${user.name},</p>
          <br> 
          <p>Aposkal hesabınızın parolası başarıyla değştirildi.</p>
          <br> 
          <p>Bu işlemi siz yapmadıysanız lütfen bizimle iletişime geçin.</p>
          <p>Teşekkürler</p>`,
  };

  await sendEmail(emailData);

  return NextResponse.json({ message: "Parola Değiştirildi" }, { status: 200 });
}
