import Link from "next/link";
import { Logo } from "@/components/landing";
import { db } from "@/lib/db";

export default async function Page({
  searchParams: { email, code: emailVerifiedCode },
}) {
  if (!email || !emailVerifiedCode) throw new Error("Insufficient data");

  const user = await db.user.findUnique({
    where: {
      email,
      emailVerifiedCode,
    },
  });

  if (!user || user?.emailVerified) throw new Error("Insufficient data");

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      emailVerifiedCode: null,
    },
  });

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* <p className="text-base font-semibold text-teal-600">Çıkış</p> */}
        <div className="flex h-28 justify-center">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" width={150} />
          </Link>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          E Posta Adresiniz Doğrulanmıştır
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600"></p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/app" className="text-sm font-semibold text-gray-900">
            Uygulamaya Git <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
