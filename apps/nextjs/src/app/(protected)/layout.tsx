import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";

import { Drawer } from "~/components/organisms/drawer/drawer";
import { DrawerMobileWrapper } from "~/components/organisms/drawer/mobile-wrapper";
import { Navbar } from "~/components/organisms/navbar/navbar";

export const metadata: Metadata = {
  title: "Stock Manager",
  description: "Simple stock management tool.",
};

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("No session");

  return (
    <>
      <Navbar session={session} />
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
