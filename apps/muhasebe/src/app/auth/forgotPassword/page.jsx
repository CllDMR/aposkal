// http://localhost:3000/auth/forgotPassword?code=6b6f5a4c-ea83-41f5-8bcc-4cda1d842509&email=furkanarici@icloud.com

import Link from "next/link";
import ResetPasswordForm from "@/app/auth/forgotPassword/ResetPasswordForm";
import { Logo } from "@/components/landing/Logo";
import { prisma } from "prismaClient";

export default async function RegisterForm({ searchParams }) {
  let error = null;
  let user = null;
  let userId = null;

  const email = searchParams.email;
  const changePasswordCode = searchParams.code;

  if (!email || !changePasswordCode) error = true;

  if (!error) {
    user = await prisma.user.findUnique({
      where: {
        email,
        changePasswordCode,
      },
    });

    if (!user) error = true;
    else userId = user.id;
  }

  if (error)
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
    <ResetPasswordForm
      email={email}
      changePasswordCode={changePasswordCode}
      userId={userId}
    />
  );
}
