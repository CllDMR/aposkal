// export const runtime = "edge";

import { auth } from "@acme/auth";
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
import type { NavbarNavigationPath } from "@acme/ui/organisms/navbar";

import { env } from "~/env.mjs";
import { getBaseAuthUrl } from "~/utils/get-base-url";

const baseAuthUrl = getBaseAuthUrl();

const toAuthURL = (path: string) => `${baseAuthUrl}${path}`;

const navbarNavigationPaths: NavbarNavigationPath[] = [
  { name: "Select Tenant", href: toAuthURL("/auth/select-tenant") },
  { name: "Your profile", href: toAuthURL("/profile") },
  { name: "Settings - Tenant", href: toAuthURL("/settings/tenant") },
  { name: "Logout", href: toAuthURL("/auth/logout") },
];

export default async function HomePage() {
  const baseAuthUrl = getBaseAuthUrl() ?? "";
  const session = await auth();

  return (
    <>
      <Header
        baseAuthUrl={baseAuthUrl}
        session={session}
        navigationPaths={navbarNavigationPaths}
        domain={env.DOMAIN}
      />

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
