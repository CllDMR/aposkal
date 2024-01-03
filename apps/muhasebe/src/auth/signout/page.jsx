"use client";
import { Logo } from "@/components/landing/Logo";
import { signOut } from "next-auth/react";

import Link from "next/link";
export default function Example() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* <p className="text-base font-semibold text-teal-600">Çıkış</p> */}
          <div className=" flex justify-center h-28">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" width={150} />
            </Link>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Güvenli Çıkış Yap
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600"></p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Çıkış Yap
            </a>
            <Link href="/app" className="text-sm font-semibold text-gray-900">
              Uygulamaya Dön <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
