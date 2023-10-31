// export const runtime = "edge";

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

export default function HomePage() {
  const baseAuthUrl = getBaseAuthUrl() ?? "";

  return (
    <>
      <Header baseAuthUrl={baseAuthUrl} />

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
