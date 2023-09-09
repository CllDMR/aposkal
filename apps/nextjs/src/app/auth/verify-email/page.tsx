import { db, eq, schema } from "@acme/db";

import { LinkButton } from "~/components/molecules/link-button";

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
      <h1>Verified your email address</h1>

      <p>{searchParams.token}</p>

      <div className="flex">
        <LinkButton href="/">Go to Home Page</LinkButton>

        <span>or</span>

        <LinkButton href="/auth/select-tenant">
          Go to Select Tenant Page
        </LinkButton>

        <span>or</span>

        <LinkButton href="/auth/logout">Go to Logout Page</LinkButton>
      </div>
    </main>
  );
}
