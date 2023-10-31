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

import { getBaseUrl } from "~/utils/get-base-url";

export default function HomePage() {
  const baseUrl = getBaseUrl() ?? "";

  return (
    <>
      <Header baseAuthUrl={baseUrl} />

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
