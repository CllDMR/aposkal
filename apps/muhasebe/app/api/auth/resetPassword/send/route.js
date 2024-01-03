import { NextResponse } from "next/server";

import { sendEmail } from "@/api/send-email/email";
import { prisma } from "prismaClient";
import { v4 as uuidv4 } from "uuid";


export async function POST(request) {
    const body = await request.json();

    const email = body.email;

    if (!email) return false

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) return NextResponse.json({ error: "E posta bulunamadı. E postanızı kontrol edin." }, { status: 400 });

    const changePasswordCode = uuidv4();

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            // update changePasswordCode as default uuid value on db
            changePasswordCode,
        },
    });

    const emailData = {
        // from: "",
        to: email,
        subject: "Şifre Sıfırlama",
        html: `<h1>Aposkal</h1>
          <p>Merhaba ${user.name},</p>
          <br> 
          <p>Bu e posta talebiniz üzerine gönderildi.</p>
          <br> 
          <p>Aşağıdaki linke tıklayarak parolanızı yeniden oluşturabilirsiniz.</p>
          <p><a href="https://muhasebe.aposkal.com/auth/forgotPassword?code=${changePasswordCode}&email=${email}">Şimdi Parolanı Sıfırla</a></p>
          <p>Teşekkürler</p>`,
    };

    await sendEmail(emailData);


    return NextResponse.json({ message: "Email gönderildi." }, { status: 200 });


}


