import { NextResponse } from "next/server";
import { sendEmail } from "@/api/send-email/email";
import { addUserToCompany, getAuth } from "@db/index";

export async function POST(request) {
  const body = await request.json();

  const { companyId, userId, email, name, phone } = body;

  const checkAtuhRes = await getAuth(request, companyId);

  if (!checkAtuhRes.isAuth)
    return NextResponse.json(
      { message: "You are not authenticated" },
      { status: 401 },
    );

  const invitedBy = checkAtuhRes.user.id;

  const inviteRes = await addUserToCompany({
    companyId,
    email,
    role: "USER",
    name,
    phone,
    invitedBy,
  });

  if (inviteRes.error)
    return NextResponse.json(inviteRes.error, { status: 400 });

  const companyTitle = inviteRes.companyTitle;
  const inviterName = inviteRes.inviterName;
  const inviteId = inviteRes.inviteId;

  const emailData = {
    // from: "",
    to: email,
    subject: "Davetiye",
    html: `<h1>Aposkal | Davetiye</h1>
        <p>Merhaba ${name},</p>
        <br> 
        <p>
        <strong>${inviterName}</strong> sizi <strong>${companyTitle}</strong> şirketi için Aposkal Muhasebe uygulamasına davet etti.</p>
        
        <br> 
        <p>Aşağıdaki linke tıklayarak davetiyenizi görüntüleyebilirsiniz</p>
        <p>Daveti kabul etmek için lütfen <a href="https://muhasebe.aposkal.com/auth/invite?code=${inviteId}&email=${email}">tıklayın</a></p>
        <p>Teşekkürler</p>`,
  };

  await sendEmail(emailData);

  return NextResponse.json("invite success", { status: 201 });
}

// https://muhasebe.aposkal.com/auth/invite?code=0520cbdf-f8ae-439f-84fa-93914424688e&email=furkan@aricimalimusavirlik.com.tr
