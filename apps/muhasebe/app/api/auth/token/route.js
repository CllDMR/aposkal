import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = await getToken({ req: request });
  return NextResponse.json({ token });
}
