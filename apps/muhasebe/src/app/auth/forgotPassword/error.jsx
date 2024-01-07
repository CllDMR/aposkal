"use client";

// Error components must be Client Components
import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/landing";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
          Hatalı şifre sıfırlama bağlantısı
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600"></p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-gray-900"
          >
            Giriş Yap <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
