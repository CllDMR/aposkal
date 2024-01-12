import Link from "next/link";

import { SendNewPasswordForm } from "~/components/auth";
import { Logo, SlimLayout } from "~/components/landing";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Page({
  searchParams: { email, changePasswordCode, userId },
}: PageProps) {
  let _email = "";
  if (typeof email === "string") _email = email;
  else if (Array.isArray(email) && typeof email[0] === "string")
    _email = email[0];

  let _changePasswordCode = "";
  if (typeof changePasswordCode === "string")
    _changePasswordCode = changePasswordCode;
  else if (
    Array.isArray(changePasswordCode) &&
    typeof changePasswordCode[0] === "string"
  )
    _changePasswordCode = changePasswordCode[0];

  let _userId = "";
  if (typeof userId === "string") _userId = userId;
  else if (Array.isArray(userId) && typeof userId[0] === "string")
    _userId = userId[0];

  return (
    <SlimLayout>
      <div className="flex animate-fadein">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>

      <h2 className="mt-20 animate-fadein text-lg font-semibold text-gray-900">
        E-Posta onaylandı
      </h2>
      <p className="mt-2 animate-fadein text-sm text-gray-700">
        Parolanız sıfırlandı. Buradan giriş yapınız.{" "}
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Tıklayın
        </Link>
      </p>

      <SendNewPasswordForm
        email={_email}
        changePasswordCode={_changePasswordCode}
        userId={_userId}
      />
    </SlimLayout>
  );
}
