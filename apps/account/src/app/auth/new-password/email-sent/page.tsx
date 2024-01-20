import Link from "next/link";

import { Logo } from "@acme/ui/atoms";
import { LayoutSlim } from "@acme/ui/templates";

import backgroundImage from "../../../../../public/images/background-auth.jpg";

export default function Page() {
  return (
    <LayoutSlim backgroundImage={backgroundImage}>
      <div className="flex animate-fadein">
        <Link href="/" aria-label="Home">
          <Logo className="w-36" />
        </Link>
      </div>

      <h2 className="mt-20 animate-fadein text-lg font-semibold text-gray-900">
        E-Posta gönderildi
      </h2>
      <p className="mt-2 animate-fadein text-sm text-gray-700">
        Lütfen e-postanızı kontrol ediniz ve parola sıfırlama link&apos;ine
        tıklayınız.
      </p>
    </LayoutSlim>
  );
}
