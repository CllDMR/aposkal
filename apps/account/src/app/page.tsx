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

import { getBaseUrl } from "~/utils/get-base-url";

export default async function HomePage() {
  const baseUrl = getBaseUrl() ?? "";
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header baseAuthUrl={baseUrl} session={session} />

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
