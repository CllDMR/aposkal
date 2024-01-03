import { redirect } from "next/navigation";
import { sendEmail } from "@/api/send-email/email";
import { prisma } from "prismaClient";
import { v4 as uuidv4 } from "uuid";

const resendEmail = async (userId) => {
  // TODO: send email again

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      // update emailVerifiedCode as default uuid value on db
      emailVerifiedCode: uuidv4(),
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user || user.emailVerified) redirect(`/app`);

  const emailVerifiedCode = user.emailVerifiedCode;
  const email = user.email;

  const emailData = {
    // from: "",
    to: email,
    subject: "Email Doğrulama",
    html: `<h1>Aposkal</h1>
          <p>Merhaba ${user.name},</p>
          <br> 
          <p>Bu ePosta talebiniz üzerine yeniden gönderildi.</p>
          <br> 
          <p>Aposkal hesabınızı oluşturduğunuz için teşekkürler.</p>
          <p>Aposkalı kullanmaya başlamadan önce email adresinizi doğrulamanız gerekiyor.</p>
          <br> 
          <p>Aşağıdaki linke tıklayarak email adresinizi doğrulayabilirsiniz.</p>
          <p>Email adresini doğrulamak için lütfen <a href="https://muhasebe.aposkal.com/auth/verify-email?code=${emailVerifiedCode}&email=${email}">tıklayın</a></p>
          <p>Teşekkürler</p>`,
  };

  await sendEmail(emailData);

  return true;
};

export default resendEmail;
