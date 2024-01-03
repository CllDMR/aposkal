import Link from "next/link";
import { Logo } from "@/components/landing/Logo";

export default function Unauthorized() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="h-28 justify-center">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>
      <div className="text-center">
        <p className="text-teal-600 text-base font-semibold">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Yetkisiz Erişim
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Bu sayfaya erişim yetkiniz bulunmamaktadır.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/app/"
            className="bg-teal-600 hover:bg-teal-500 focus-visible:outline-teal-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Uygulamaya geri dön
          </Link>
          {/* <Link href="#" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link> */}
        </div>
      </div>
    </main>
  );
}
