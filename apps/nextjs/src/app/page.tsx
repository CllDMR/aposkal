import Link from "next/link";

import { authOptions, getServerSession } from "@acme/auth";

import { Button } from "~/components/molecules/button";

// export const runtime = "edge";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <span>Home Page</span>
      {session ? (
        <div>
          <p>
            {session.user.ti} - {session.user.tn} - {session.user.id} -{" "}
            {session.user.name}
          </p>
          <Link href="/auth/logout">
            <Button>Logout</Button>
          </Link>
        </div>
      ) : (
        <>
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Register</Button>
          </Link>
        </>
      )}
    </main>
  );
}
