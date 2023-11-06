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
import type { NavbarNavigationPath } from "@acme/ui/organisms/navbar";

import { env } from "~/env.mjs";
import { getBaseUrl } from "~/utils/get-base-url";

const baseAuthUrl = getBaseUrl();

const toAuthURL = (path: string) => `${baseAuthUrl}${path}`;

const navbarNavigationPaths: NavbarNavigationPath[] = [
  { name: "Select Tenant", href: toAuthURL("/auth/select-tenant") },
  { name: "Your profile", href: toAuthURL("/profile") },
  { name: "Settings - Tenant", href: toAuthURL("/settings/tenant") },
  { name: "Logout", href: toAuthURL("/auth/logout") },
];

export default async function HomePage() {
  const baseUrl = getBaseUrl() ?? "";
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header
        baseAuthUrl={baseUrl}
        hasSessionRedirectPathname="/profile"
        hasSessionRedirectButtonTitle="Profile"
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
