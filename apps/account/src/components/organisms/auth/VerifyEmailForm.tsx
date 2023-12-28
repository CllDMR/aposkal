import Image from "next/image";

import { Card } from "@acme/ui/atoms";
import { LinkButton } from "@acme/ui/molecules";

export default function VerifyEmailForm() {
  return (
    <div className="grid min-h-screen min-w-full items-center justify-center">
      <Card>
        <Image
          className="mb-12 h-24"
          src="/logo.svg"
          alt="Aposkal Logo"
          width={286.3}
          height={141.73}
          priority
        />

        <h1>Verified your email address</h1>

        <div className="mt-6 flex flex-col gap-4">
          <LinkButton href="/">Go to Home Page</LinkButton>

          <LinkButton href="/auth/select-tenant">
            Go to Select Tenant Page
          </LinkButton>

          <LinkButton href="/auth/logout">Go to Logout Page</LinkButton>
        </div>
      </Card>
    </div>
  );
}
