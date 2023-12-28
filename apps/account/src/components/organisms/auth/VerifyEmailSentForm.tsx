import Image from "next/image";

import { Card } from "@acme/ui/atoms";
import { LinkButton } from "@acme/ui/molecules";

export default function VerifyEmailSentForm() {
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

        <h1>Verify email sent</h1>
        <p>Please check your email.</p>

        <div className="mt-4">
          <LinkButton href="/">Go to Home Page</LinkButton>
        </div>
      </Card>
    </div>
  );
}
