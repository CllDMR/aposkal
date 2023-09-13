import { authOptions, getServerSession } from "@acme/auth";
import { LinkButton } from "@acme/ui/molecules";

import { getBaseAuthUrl, getBaseUrl } from "~/utils/get-base-url";

// export const runtime = "edge";

export default async function HomePage() {
  const baseUrl = getBaseUrl();
  const baseAuthUrl = getBaseAuthUrl();
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
          <LinkButton
            href={`${baseAuthUrl}/auth/logout?callbackUrl=${encodeURIComponent(
              baseUrl,
            )}`}
          >
            Logout
          </LinkButton>
        </div>
      ) : (
        <>
          <LinkButton
            href={`${baseAuthUrl}/auth/login?callbackUrl=${encodeURIComponent(
              baseUrl,
            )}`}
          >
            Login
          </LinkButton>
          <LinkButton
            href={`${baseAuthUrl}/auth/register?callbackUrl=${encodeURIComponent(
              baseUrl,
            )}`}
          >
            Register
          </LinkButton>
        </>
      )}
    </main>
  );
}
