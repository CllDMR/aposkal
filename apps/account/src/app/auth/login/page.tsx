import Link from "next/link";

import { Logo } from "@acme/ui/atoms";
import { LayoutSlim } from "@acme/ui/templates";

import LoginForm from "~/components/organisms/auth/LoginForm";
import backgroundImage from "../../../../public/images/background-auth.jpg";

export default function LoginPage() {
  return (
    <LayoutSlim backgroundImage={backgroundImage}>
      <div className="flex animate-fadein items-center justify-center">
        <Link href="/" aria-label="Home">
          <Logo className="h-32" />
        </Link>
      </div>

      <h2 className="mt-14 animate-fadein text-lg font-semibold text-gray-900">
        Hesabınıza giriş yapın
      </h2>
      <p className="mb-10 mt-2 animate-fadein text-sm text-gray-700">
        Hesabınız yok mu?{" "}
        <Link
          href="/auth/register"
          className="text-blue-600 font-medium hover:underline"
        >
          Ücretsiz hesap oluşturun
        </Link>
      </p>

      <LoginForm />

      <p className="mt-2 animate-fadein text-sm text-gray-700">
        Parolanızı mı unuttunuz?{" "}
        <Link
          href="/auth/new-password/send-email"
          className="text-blue-600 font-medium hover:underline"
        >
          Buradan
        </Link>
      </p>
    </LayoutSlim>
  );
}
