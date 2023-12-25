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
import type { AppsDropdownSolution } from "@acme/ui/organisms/navbar/apps-dropdown";

import { env } from "~/env.mjs";
import { getBaseAuthUrl, getBaseUrl } from "~/utils/get-base-url";

const baseAuthUrl = getBaseAuthUrl();

const toAuthURL = (path: string) => `${baseAuthUrl}${path}`;

const navbarNavigationPaths: NavbarNavigationPath[] = [
  { name: "Select Tenant", href: toAuthURL("/auth/select-tenant") },
  { name: "Your profile", href: toAuthURL("/profile") },
  { name: "Settings - Tenant", href: toAuthURL("/settings/tenant") },
  { name: "Logout", href: toAuthURL("/auth/logout") },
];

const solutions: AppsDropdownSolution[] = [
  {
    name: "Membership Manager",
    description: "Control your accounts, users, organizations and billing",
    subdomain: env.ACCOUNT_SUBDOMAIN,
    port: env.ACCOUNT_PORT,
    pathname: "/",
    iconName: "one",
  },
  {
    name: "Customer Manager",
    description: "Manage and track relationships with your customers",
    subdomain: env.CUSTOMER_SUBDOMAIN,
    port: env.CUSTOMER_PORT,
    pathname: "/dashboard",
    iconName: "three",
  },
  {
    name: "Inventory Manager",
    description: "Keep your products organized",
    subdomain: env.INVENTORY_SUBDOMAIN,
    port: env.INVENTORY_PORT,
    pathname: "/dashboard",
    iconName: "two",
  },
  {
    name: "Logistic Manager",
    description: "Track and analyze your logictics",
    subdomain: env.LOGISTIC_SUBDOMAIN,
    port: env.LOGISTIC_PORT,
    pathname: "/dashboard",
    iconName: "three",
  },
  {
    name: "Order Manager",
    description: "Interact with your orders of customers and suppliers",
    subdomain: env.ORDER_SUBDOMAIN,
    port: env.ORDER_PORT,
    pathname: "/dashboard",
    iconName: "three",
  },
];

export default async function HomePage() {
  const baseUrl = getBaseUrl() ?? "";
  const baseAuthUrl = getBaseAuthUrl() ?? "";
  const session = await auth();

  return (
    <>
      <Header
        baseAuthUrl={baseAuthUrl}
        baseUrl={baseUrl}
        session={session}
        navigationPaths={navbarNavigationPaths}
        domain={env.DOMAIN}
        solutions={solutions}
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
