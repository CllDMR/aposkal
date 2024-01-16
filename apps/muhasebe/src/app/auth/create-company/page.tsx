import Link from "next/link";

import { CreateCompanyForm } from "~/components/auth/CreateCompanyForm";
import { Logo, SlimLayout } from "~/components/landing";

export default function Page() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>
      <h2 className="mt-16 text-lg font-semibold text-gray-900">
        Yeni Firma Ekle
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        veya{" "}
        <Link href="/app" className="font-medium text-blue-600 hover:underline">
          Firma Seçin
        </Link>{" "}
      </p>
      <CreateCompanyForm />
    </SlimLayout>
  );
}
