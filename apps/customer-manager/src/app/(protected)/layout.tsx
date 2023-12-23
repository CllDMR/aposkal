import { auth } from "@acme/auth";
import { Drawer, DrawerMobileWrapper, Navbar } from "@acme/ui/organisms";
import type { DrawerNavigationPath } from "@acme/ui/organisms/drawer";
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
  {
    name: "Companies",
    href: "/companies",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        />
      </svg>
    ),
  },
  {
    name: "Address Companies",
    href: "/address-companies",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="ml-2 h-6 w-6 shrink-0 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        />
      </svg>
    ),
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
        projectName="Customer Manager"
      />
      <div>
        <DrawerMobileWrapper navigationPaths={drawerNavigationPaths} />

        <Drawer navigationPaths={drawerNavigationPaths} />

        {props.children}
      </div>
    </>
  );
}
