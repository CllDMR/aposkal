/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resend } from "resend";

import { emailTemplate } from "./template";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  from?: string;
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (emailData: EmailData) => {
  await resend.emails.send({
    from: emailData.from ?? "noreply@aposkal.com",
    to: emailData.to,
    subject: "Aposkal | " + emailData.subject,
    html: emailTemplate({ htmlMessage: emailData.html }),
  });

  return { messsage: "email send" };
};

export const sendEmailResetPassword = async (
  name: string,
  email: string,
  changePasswordCode: string,
) => {
  const emailData: EmailData = {
    to: email,
    subject: "Şifre Sıfırlama",
    html: `<h1>Aposkal</h1>
              <p>Merhaba ${name},</p>
              <br> 
              <p>Bu e posta talebiniz üzerine gönderildi.</p>
              <br> 
              <p>Aşağıdaki linke tıklayarak parolanızı yeniden oluşturabilirsiniz.</p>
              <p><a href="https://muhasebe.aposkal.com/auth/new-password/email-verified?code=${changePasswordCode}&email=${email}">Şimdi Parolanı Sıfırla</a></p>
              <p>Teşekkürler</p>`,
  };

  await sendEmail(emailData);
};

export const sendEmailResetPasswordVerified = async (
  name: string,
  email: string,
) => {
  const emailData: EmailData = {
    to: email,
    subject: "Şifreniz Değiştirildi",
    html: `<h1>Aposkal</h1>
          <p>Merhaba ${name},</p>
          <br> 
          <p>Aposkal hesabınızın parolası başarıyla değştirildi.</p>
          <br> 
          <p>Bu işlemi siz yapmadıysanız lütfen bizimle iletişime geçin.</p>
          <p>Teşekkürler</p>`,
  };

  await sendEmail(emailData);
};

export const sendEmailResetPasswordAgain = async (userId: string) => {
  // await db.user.update({
  //   where: {
  //     id: userId,
  //   },
  //   data: {
  //     emailVerifiedCode: nanoid(),
  //   },
  // });

  // const user = await db.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  // });
  // if (!user || user.emailVerified) redirect(`/app`);

  // const emailVerifiedCode = user.emailVerifiedCode;
  // const email = user.email;

  // const emailData: EmailData = {
  //   to: email,
  //   subject: "Email Doğrulama",
  //   html: `<h1>Aposkal</h1>
  //         <p>Merhaba ${user.name},</p>
  //         <br>
  //         <p>Bu ePosta talebiniz üzerine yeniden gönderildi.</p>
  //         <br>
  //         <p>Aposkal hesabınızı oluşturduğunuz için teşekkürler.</p>
  //         <p>Aposkalı kullanmaya başlamadan önce email adresinizi doğrulamanız gerekiyor.</p>
  //         <br>
  //         <p>Aşağıdaki linke tıklayarak email adresinizi doğrulayabilirsiniz.</p>
  //         <p>Email adresini doğrulamak için lütfen <a href="https://muhasebe.aposkal.com/auth/verify-email?code=${emailVerifiedCode}&email=${email}">tıklayın</a></p>
  //         <p>Teşekkürler</p>`,
  // };

  const emailData: EmailData = {
    html: "",
    subject: "",
    to: "",
    from: "",
  };
  await sendEmail(emailData);

  return true;
};
