import { db, eq, schema } from "@acme/db";

import VerifyEmailForm from "~/components/organisms/auth/VerifyEmailForm";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  await db
    .update(schema.user)
    .set({ emailVerified: new Date() })
    .where(eq(schema.user.id, searchParams.token));

  return <VerifyEmailForm />;
}
