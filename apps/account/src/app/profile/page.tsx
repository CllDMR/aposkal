import { auth } from "@acme/auth";
import { Main } from "@acme/ui/atoms";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <Main>
      <span>Profile Page</span>
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </Main>
  );
}
