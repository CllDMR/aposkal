import Link from "next/link";

import { NewPasswordForm } from "~/components/auth";
import { Logo, SlimLayout } from "~/components/landing";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Page({ searchParams: { email } }: PageProps) {
  let _email = "";
  if (typeof email === "string") _email = email;
  else if (Array.isArray(email) && typeof email[0] === "string")
    _email = email[0];

  return (
    <SlimLayout>
      <div className="flex animate-fadein">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>

      <h2 className="mt-20 animate-fadein text-lg font-semibold text-gray-900">
        Parolanızı sıfırlayın
      </h2>
      <p className="mt-2 animate-fadein text-sm text-gray-700">
        Veya giriş yapmak için{" "}
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Tıklayın
        </Link>
      </p>

      <NewPasswordForm email={_email} />
    </SlimLayout>
  );
}
