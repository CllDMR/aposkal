import { Resend } from "resend";

import { emailTemplate } from "./template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (emailData: {
  from?: string;
  to: string;
  subject: string;
  html: string;
}) => {
  await resend.emails.send({
    from: emailData.from ?? "noreply@aposkal.com",
    to: emailData.to,
    subject: "Aposkal | " + emailData.subject,
    html: emailTemplate(emailData.html),
  });

  return { messsage: "email send" };
};

export const sendEmailResetPasswordVerified = async (
  name: string,
  email: string,
) => {
  const emailData = {
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

export const sendEmailResetPassword = async (
  name: string,
  email: string,
  changePasswordCode: string,
) => {
  const emailData = {
    to: email,
    subject: "Şifre Sıfırlama",
    html: `<h1>Aposkal</h1>
              <p>Merhaba ${name},</p>
              <br> 
              <p>Bu e posta talebiniz üzerine gönderildi.</p>
              <br> 
              <p>Aşağıdaki linke tıklayarak parolanızı yeniden oluşturabilirsiniz.</p>
              <p><a href="https://muhasebe.aposkal.com/auth/forgotPassword?code=${changePasswordCode}&email=${email}">Şimdi Parolanı Sıfırla</a></p>
              <p>Teşekkürler</p>`,
  };

  await sendEmail(emailData);
};
