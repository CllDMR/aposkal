import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@acme/auth";
import { sendEmailResetPasswordAgain } from "@acme/email";
import { Logo } from "@acme/ui/atoms";

export default async function Page() {
  const session = await auth();

  if (!session) redirect(`/`);

  await sendEmailResetPasswordAgain(session.user.id);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* <p className="text-base font-semibold text-teal-600">Çıkış</p> */}
        <div className="flex h-28 justify-center">
          <Link href="/" aria-label="Home">
            <Logo className="w-36" />
          </Link>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          E posta gönderildi
        </h1>

        <p className="mt-6 text-base leading-7 text-gray-600">
          Lütfen önemsiz e postalarınızı kontrol ediniz.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/app" className="text-sm font-semibold text-gray-900">
            Uygulamaya Git <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
