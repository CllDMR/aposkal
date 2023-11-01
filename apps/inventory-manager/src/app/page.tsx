// export const runtime = "edge";

import { authOptions, getServerSession } from "@acme/auth";
import {
  CallToAction,
  Faqs,
  Footer,
  Header,
  Hero,
  Pricing,
  PrimaryFeatures,
  SecondaryFeatures,
  Testimonials,
} from "@acme/ui/organisms/landing";

import { getBaseAuthUrl } from "~/utils/get-base-url";

export default async function HomePage() {
  const baseAuthUrl = getBaseAuthUrl() ?? "";
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header baseAuthUrl={baseAuthUrl} session={session} />

      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>

      <Footer />
    </>
  );
}
