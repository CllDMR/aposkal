import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const parseRequestBody = async (
  request: NextRequest,
  validationSchema: Zod.AnyZodObject,
) => {
  const body: unknown = await request.json();

  const validation = validationSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  return validation.data;
};
