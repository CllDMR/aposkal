import Link from "next/link";

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
        E-Posta gönderildi
      </h2>
      <p className="mt-2 animate-fadein text-sm text-gray-700">
        Lütfen e-postanızı kontrol ediniz ve parola sıfırlama link&apos;ine
        tıklayınız.
      </p>
    </SlimLayout>
  );
}
