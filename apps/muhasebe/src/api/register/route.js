import { NextResponse } from "next/server";
import { sendEmail } from "@/api/send-email/email";
import { createNewUser } from "@db/index";

export async function POST(request) {
  const host = request.headers.get("host");
  const body = await request.json();

  const userRes = await createNewUser(body);
  // if userRes throws error
  if (userRes.error)
    return NextResponse.json({ error: userRes.error }, { status: 400 });

  // TODO: send email verification
  const emailVerifiedCode = userRes.newUser.emailVerifiedCode;
  const email = userRes.newUser.email;
  const userName = userRes.newUser.name;

  const emailData = {
    // from: "",
    to: email,
    subject: "Email Doğrulama",
    html: `<h1>Aposkal</h1>
    <p>Merhaba ${userName},</p>
    <br> 
    <p>Aposkal hesabınızı oluşturduğunuz için teşekkürler.</p>
    <p>Aposkalı kullanmaya başlamadan önce email adresinizi doğrulamanız gerekiyor.</p>
    <br> 
    <p>Aşağıdaki linke tıklayarak email adresinizi doğrulayabilirsiniz.</p>
    <p>Email adresini doğrulamak için lütfen <a href="https://muhasebe.aposkal.com/auth/verify-email?code=${emailVerifiedCode}&email=${email}">tıklayın</a></p>
    <p>Teşekkürler</p>`,
  };

  await sendEmail(emailData);

  return NextResponse.json({ email });
}
