import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { Drawer, DrawerMobileWrapper, Navbar } from "@acme/ui/organisms";
import type { NavigationPath } from "@acme/ui/organisms/navbar";

import { getBaseAuthUrl } from "~/utils/get-base-url";

const baseAuthUrl = getBaseAuthUrl();

const toAuthURL = (path: string) => `${baseAuthUrl}${path}`;

const navigationPaths: NavigationPath[] = [
  { name: "Select Tenant", href: toAuthURL("/auth/select-tenant") },
  { name: "Your profile", href: toAuthURL("/profile") },
  { name: "Logout", href: toAuthURL("/auth/logout") },
];

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No session");

  return (
    <>
      <Navbar session={session} navigationPaths={navigationPaths} />
      <div>
        <DrawerMobileWrapper />

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-20 lg:flex lg:w-52 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <Drawer />
        </div>

        {props.children}
      </div>
    </>
  );
}
