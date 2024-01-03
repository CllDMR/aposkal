import { emailSchema } from "@/validationSchemas";
// import { NextResponse } from "next/server";
import { Resend } from "resend";

import emailTemplate from "./template";

const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST() {
//   const body = await NextRequest.json();

//   const validation = emailSchema.safeParse(body);

//   if (!validation.success)
//     return NextResponse.json(validation.error.errors, {
//       status: 400,
//     });

//   await resend.emails.send({
//     from: body.from || "noreply@aposkal.com",
//     to: body.to,
//     subject: "Aposkal | " + body.subject,
//     html: emailTemplate({ htmlMessage: body.html }),
//     // react: <WelcomeTemplate name="Furkan" />,
//   });

//   return NextResponse.json({ success: true });
// }

export const sendEmail = async (emailData) => {
  const validation = emailSchema.safeParse(emailData);
  if (!validation.success) return { message: validation.error.errors };
  await resend.emails.send({
    from: emailData.from || "noreply@aposkal.com",
    to: emailData.to,
    subject: "Aposkal | " + emailData.subject,
    html: emailTemplate({ htmlMessage: emailData.html }),
    // react: <WelcomeTemplate name="Furkan" />,
  });
  return { messsage: "email send" };
};
