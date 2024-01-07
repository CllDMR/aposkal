import { authOptions } from "@/api/auth/authOptions";
import { Footer, Header, Hero } from "@/components/landing";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

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
