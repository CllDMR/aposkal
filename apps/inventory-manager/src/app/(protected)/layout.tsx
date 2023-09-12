import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { Drawer, DrawerMobileWrapper, Navbar } from "@acme/ui/organisms";
import type { DrawerNavigationPath } from "@acme/ui/organisms/drawer";
import type { NavbarNavigationPath } from "@acme/ui/organisms/navbar";

import { getBaseAuthUrl } from "~/utils/get-base-url";

const baseAuthUrl = getBaseAuthUrl();

const toAuthURL = (path: string) => `${baseAuthUrl}${path}`;

const navbarNavigationPaths: NavbarNavigationPath[] = [
  { name: "Select Tenant", href: toAuthURL("/auth/select-tenant") },
  { name: "Your profile", href: toAuthURL("/profile") },
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
    name: "Posts",
    href: "/posts",
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
    children: [
      { name: "All", href: "/posts" },
      { name: "Create New", href: "/posts/create" },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
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
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
    children: [{ name: "Tenant", href: "/settings/tenant" }],
  },
];

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No session");

  return (
    <>
      <Navbar session={session} navigationPaths={navbarNavigationPaths} />
      <div>
        <DrawerMobileWrapper navigationPaths={drawerNavigationPaths} />

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-20 lg:flex lg:w-52 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <Drawer navigationPaths={drawerNavigationPaths} />
        </div>

        {props.children}
      </div>
    </>
  );
}
