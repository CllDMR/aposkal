import { NextResponse } from "next/server";
import { createCompany, getAuth } from "@/lib/services";

export async function POST(request) {
  const checkAtuhRes = await getAuth(request);

  if (!checkAtuhRes.isAuth)
    return NextResponse.json(
      { message: "You are not authenticated" },
      { status: 401 },
    );

  const body = await request.json();
  const companyData = await createCompany({
    company: body,
    userId: checkAtuhRes.user.id,
  });
  if (companyData.error)
    return NextResponse.json(companyData.error, { status: 400 });

  return NextResponse.json(companyData.newCompany, { status: 201 });
}
