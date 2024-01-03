import { NextResponse } from "next/server";
import { acceptInvite } from "@db/index";

export async function POST(request) {
  const body = await request.json();
  const { inviteId, userId, email, password } = body;
  // const checkAtuhRes = await getAuth(request);

  // if (!checkAtuhRes.isAuth)
  //     return NextResponse.json(
  //         { message: "You are not authenticated", },
  //         { status: 401 }
  //     );

  const acceptInviteRes = await acceptInvite({
    inviteId,
    userId,
    email,
    password,
  });

  if (acceptInviteRes.error)
    return NextResponse.json(
      { message: acceptInviteRes.error },
      { status: acceptInviteRes.code },
    );

  return NextResponse.json("acceptInvite success", { status: 201 });
}
