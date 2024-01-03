import { Logo } from "@/components/landing/Logo";
import Link from "next/link";
import { prisma } from "prismaClient";

export default async function EmailVerify({ searchParams }) {
  const email = searchParams.email;
  const emailVerifiedCode = searchParams.code;

  // kullanıcıyı bul
  const user = await prisma.user.findUnique({
    where: {
      email,
      emailVerifiedCode,
    },
  });

  // kullanıcı varsa ve email doğrulanmamışsa doğrula
  if (user && !user?.emailVerified) {
    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
        emailVerifiedCode: null,
      },
    });
  }

  if (!email || !emailVerifiedCode || !user || user?.emailVerified) {
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
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Hatalı İstek
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600"></p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/app" className="text-sm font-semibold text-gray-900">
                Uygulamaya Git <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

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
    </>
  );
}
