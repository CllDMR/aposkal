"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/landing";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="grid h-screen place-items-center bg-gray-100 px-6 py-10 lg:px-8">
      <div className="text-center">
        {/* <p className="text-base font-semibold text-teal-600">Çıkış</p> */}

        <div className="flex h-20 justify-center ">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" width={150} />
          </Link>
        </div>

        <h1 className="mt-6 text-5xl font-bold text-gray-900">
          Hatalı Davetiye
        </h1>
        <p className="mt-6 w-96 text-base leading-7 text-gray-600">
          Davetiye kodunuz hatalı. Daha önce kullanılmış veya süresi dolmuş
          olabilir.
        </p>

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
