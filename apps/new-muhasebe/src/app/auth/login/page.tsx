import Link from "next/link";

import { LoginForm } from "~/components/auth";
import { Logo, SlimLayout } from "~/components/landing";

export default function Page() {
  return (
    <SlimLayout>
      <div className="flex animate-fadein">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>

      <h2 className="mt-20 animate-fadein text-lg font-semibold text-gray-900">
        Hesabınıza giriş yapın
      </h2>
      <p className="mt-2 animate-fadein text-sm text-gray-700">
        Hesabınız yok mu?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Ücretsiz hesap oluşturun
        </Link>
      </p>

      <LoginForm />

      <p className="mt-2 animate-fadein text-sm text-gray-700">
        Parolanızı mı unuttunuz?{" "}
        <Link
          href="/auth/new-password/send-email"
          className="font-medium text-blue-600 hover:underline"
        >
          Buradan
        </Link>
      </p>
    </SlimLayout>
  );
}
