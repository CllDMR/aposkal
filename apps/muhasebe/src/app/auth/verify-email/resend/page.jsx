import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/landing";
import { sendEmailResetPasswordAgain } from "@/lib/email";
import { getAuth } from "@/lib/services";

export default async function Page() {
  const auth = await getAuth();
  const userId = auth?.user?.id;
  if (!userId) redirect(`/app`);

  await sendEmailResetPasswordAgain(userId);

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
