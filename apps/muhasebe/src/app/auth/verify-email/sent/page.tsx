import Link from "next/link";

import { Logo } from "~/components/landing";

export default function Page() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="flex h-28 justify-center">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" width={150} />
          </Link>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Doğrulama Postası, E Posta Adresinize Yollanmıştır
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600"></p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-gray-900"
          >
            Giriş yapın <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
