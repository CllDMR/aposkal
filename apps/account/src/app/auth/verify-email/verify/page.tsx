import Link from "next/link";

import { and, db, eq, schema } from "@acme/db";
import { Logo } from "@acme/ui/atoms";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Page({
  searchParams: { email, code: emailVerifiedCode },
}: PageProps) {
  if (!email || !emailVerifiedCode) throw new Error("Insufficient data");

  let _email = "";
  if (typeof email === "string") _email = email;
  else if (Array.isArray(email) && typeof email[0] === "string")
    _email = email[0];

  let _emailVerifiedCode = "";
  if (typeof emailVerifiedCode === "string")
    _emailVerifiedCode = emailVerifiedCode;
  else if (
    Array.isArray(emailVerifiedCode) &&
    typeof emailVerifiedCode[0] === "string"
  )
    _emailVerifiedCode = emailVerifiedCode[0];

  const user = (
    await db
      .select()
      .from(schema.user)
      .where(
        and(
          eq(schema.user.email, _email),
          eq(schema.user.emailVerifiedCode, _emailVerifiedCode),
        ),
      )
      .limit(0)
  )[0];

  // if (!user || user?.emailVerified) throw new Error("Insufficient data");
  if (!user) throw new Error("Insufficient data");

  await db
    .update(schema.user)
    .set({
      emailVerified: new Date(new Date().toUTCString()),
      emailVerifiedCode: null,
    })
    .where(eq(schema.user.id, user.id));

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="flex h-28 justify-center">
          <Link href="/" aria-label="Home">
            <Logo className="w-36" />
          </Link>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          E Posta Adresiniz Doğrulanmıştır
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600"></p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className="text-sm font-semibold text-gray-900">
            Uygulamaya Git <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
