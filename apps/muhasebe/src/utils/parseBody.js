export const parseRequestBody = async (request, validationSchema) => {
  const body = await request.json();

  const validation = validationSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  return validation.data;
};
