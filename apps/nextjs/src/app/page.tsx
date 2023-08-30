import Link from "next/link";

import { authOptions, getServerSession } from "@acme/auth";

import { Main } from "~/components/atoms/Main";

// export const runtime = "edge";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <Main>
      <span>Home Page</span>
      {session ? (
        <div>
          <p>
            {session.user.ti} - {session.user.tn} - {session.user.id} -{" "}
            {session.user.name}
          </p>
          <Link href="/auth/logout">Logout</Link>
        </div>
      ) : (
        <>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </>
      )}
    </Main>
  );
}
