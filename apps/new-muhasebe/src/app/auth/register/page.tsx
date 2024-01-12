import Link from "next/link";

import { RegisterForm } from "~/components/auth";
import { Logo, SlimLayout } from "~/components/landing";

export default function Page() {
  return (
    <SlimLayout>
      <div className="animate-fadein flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>

      <h2 className="animate-fadein mt-20 text-lg font-semibold text-gray-900">
        Şimdi ücretsiz hesap oluşturun
      </h2>
      <p className="animate-fadein mt-2 text-sm text-gray-700">
        Hesabınız var mı?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Giriş Yapın
        </Link>{" "}
      </p>

      <RegisterForm />
    </SlimLayout>
  );
}
