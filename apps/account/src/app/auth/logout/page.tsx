import Link from "next/link";

import { Logo } from "@acme/ui/atoms";
import { LayoutSlim } from "@acme/ui/templates";

import LogoutForm from "~/components/organisms/auth/LogoutForm";
import backgroundImage from "../../../../public/images/background-auth.jpg";

export default function LogoutPage() {
  return (
    <LayoutSlim backgroundImage={backgroundImage}>
      <div className="animate-fadein flex items-center justify-center">
        <Link href="/" aria-label="Home">
          <Logo className="h-32" />
        </Link>
      </div>

      <h2 className="animate-fadein mt-14 mb-6 text-md font-medium text-gray-900">
        Şimdi güvenli bir şekilde çıkış yapabilirsiniz.
      </h2>

      <LogoutForm />
    </LayoutSlim>
  );
}
