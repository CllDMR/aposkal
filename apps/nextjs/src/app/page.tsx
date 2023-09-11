import { authOptions, getServerSession } from "@acme/auth";
import { LinkButton } from "@acme/ui/molecules";

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
          <LinkButton href="/auth/logout">Logout</LinkButton>
        </div>
      ) : (
        <>
          <LinkButton href="/auth/login">Login</LinkButton>
          <LinkButton href="/auth/register">Register</LinkButton>
        </>
      )}
    </main>
  );
}
