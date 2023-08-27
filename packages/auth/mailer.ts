import { createTransport, getTestMessageUrl } from "nodemailer";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "clotilde.weissnat@ethereal.email",
    pass: "GJ2BZFrt8zG3YQd9JD",
  },
});

export const sendMail = async ({
  to,
  userId,
}: {
  to: string;
  userId: string;
}) => {
  const info = await transporter.sendMail({
    from: '"Clotilde Weissnat" <clotilde.weissnat@ethereal.email>', // sender address
    to, // list of receivers
    subject: "Verify Your Email", // Subject line
    html: `<a href='http://localhost:3000/auth/verify-email?token=${userId}'>Verify email</a>`, // html body
  });

  console.log(getTestMessageUrl(info));
};
