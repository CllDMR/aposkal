// export const runtime = "edge";
import { auth } from "@acme/auth";

import { Footer, Header, Hero } from "~/components/landing";

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <Header session={session} />

      <main className="min-h-screen">
        <Hero />
      </main>

      <Footer />
    </>
  );
}
