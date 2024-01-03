
import { removeUserFromCompany, updateUserInCompany } from "@db/index";
import { NextResponse } from "next/server";


export async function PATCH(request, { params }) {

  const userId = params.userId;
  const companyId = params.companyId;
  const body = await request.json();

  const {
    isActive,
    role } = body;

  const result = await updateUserInCompany({ companyId, userId, isActive, role });


  if (result.error) return NextResponse.json(result.error, { status: 400 });

  return NextResponse.json("updated Success", { status: 200 });

}

export async function DELETE(request, { params }) {

  const userId = params.userId;
  const companyId = params.companyId;

  // const body = await request.json();

  const result = await removeUserFromCompany({ companyId, userId });

  if (result.error) return NextResponse.json(result.error, { status: 400 });

  return NextResponse.json("deleted Success", { status: 200 });
}
