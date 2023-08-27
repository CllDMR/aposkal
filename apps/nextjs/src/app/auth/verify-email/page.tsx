import { db, eq, schema } from "@acme/db";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  await db
    .update(schema.user)
    .set({ emailVerified: new Date() })
    .where(eq(schema.user.id, searchParams.token));

  return (
    <main>
      <h1>Verifing email</h1>

      <p>{searchParams.token}</p>
    </main>
  );
}
