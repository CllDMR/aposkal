"use client";

import type { FC, PropsWithChildren } from "react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import type { Session } from "next-auth";

import { useSidebarStore } from "../../store/sidebar";
import { AppsDropdown } from "./apps-dropdown";
import { ProfileDropdown } from "./profile-dropdown";

type NavbarProps = PropsWithChildren & {
  session: Session;
  navigationPaths: NavbarNavigationPath[];
  domain: string;
};

export interface NavbarNavigationPath {
  name: string;
  href: string;
}

export const Navbar: FC<NavbarProps> = ({
  children,
  session,
  navigationPaths,
  domain,
}) => {
  const { setOpen } = useSidebarStore();

  return (
    <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-gray-50 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:pl-60 lg:pr-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* TODO:  Burada search iconlu button koyalım. modal açılsın */}
        {/* <div className="relative pt-4">
          <Search />
        </div> */}
        <div className="flex flex-1 items-center">{children}</div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <AppsDropdown domain={domain} />

          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
            aria-hidden="true"
          />

          {/* Profile dropdown */}
          <ProfileDropdown
            navigationPaths={navigationPaths}
            session={session}
          />
        </div>
      </div>
    </div>
  );
};
