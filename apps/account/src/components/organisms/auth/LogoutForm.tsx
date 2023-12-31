import Image from "next/image";

import { signOut } from "@acme/auth";
import { Card } from "@acme/ui/atoms";
import { Button } from "@acme/ui/molecules";

async function logout() {
  "use server";
  await signOut({
    redirectTo: "/",
  });
}

export default function LogoutForm() {
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

        <form action={logout}>
          <div className="mb-6">
            <span>You can logout securely now.</span>
          </div>
          <Button fullwidth type="submit">
            Logout
          </Button>
        </form>
      </Card>
    </div>
  );
}
