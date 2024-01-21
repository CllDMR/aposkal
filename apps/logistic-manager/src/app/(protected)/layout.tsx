import { auth } from "@acme/auth";
import { env } from "@acme/env";
import { Drawer, DrawerMobileWrapper, Navbar } from "@acme/ui/organisms";
import type { DrawerNavigationPath } from "@acme/ui/organisms/drawer";
import type { NavbarNavigationPath } from "@acme/ui/organisms/navbar";
import type { AppsDropdownSolution } from "@acme/ui/organisms/navbar/apps-dropdown";
import { getBaseAuthUrl } from "@acme/util";

import packageJson from "../../../package.json";

const baseAuthUrl = getBaseAuthUrl();

const toAuthURL = (path: string) => `${baseAuthUrl}${path}`;

const navbarNavigationPaths: NavbarNavigationPath[] = [
  { name: "Select Tenant", href: toAuthURL("/auth/select-tenant") },
  { name: "Your profile", href: toAuthURL("/profile") },
  { name: "Settings - Tenant", href: toAuthURL("/settings/tenant") },
  { name: "Logout", href: toAuthURL("/auth/logout") },
];

const drawerNavigationPaths: DrawerNavigationPath[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
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

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) throw new Error("No session");

  return (
    <>
      <Navbar
        session={session}
        navigationPaths={navbarNavigationPaths}
        domain={env.DOMAIN}
        projectName="Logistic Manager"
        solutions={solutions}
      />
      <div>
        <DrawerMobileWrapper navigationPaths={drawerNavigationPaths} />

        <Drawer
          navigationPaths={drawerNavigationPaths}
          packageJsonVersion={packageJson.version}
        />

        {props.children}
      </div>
    </>
  );
}
