import Link from "next/link";

import { db, eq, schema } from "@acme/db";

import { Button } from "~/components/molecules/button";

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
        <Link href="/">
          <Button>Go to Home Page</Button>
        </Link>

        <span>or</span>

        <Link href="/auth/select-tenant">
          <Button>Go to Select Tenant Page</Button>
        </Link>

        <span>or</span>

        <Link href="/auth/logout">
          <Button>Go to Logout Page</Button>
        </Link>
      </div>
    </main>
  );
}
