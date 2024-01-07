import { Footer, Header, Hero } from "@/components/landing";

import { auth } from "@acme/auth";

export default async function Page() {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      <main>
        <Hero />
        {/* <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs /> */}
      </main>
      <Footer />
    </>
  );
}
