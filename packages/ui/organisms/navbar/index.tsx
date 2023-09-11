"use client";

import type { FC, PropsWithChildren } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import type { Session } from "next-auth";

import { useSidebarStore } from "../../store/sidebar";

type NavbarProps = PropsWithChildren & {
  session: Session;
};

const userNavigation = [
  { name: "Select Tenant", href: "/auth/select-tenant" },
  { name: "Your profile", href: "/profile" },
  { name: "Logout", href: "/auth/logout" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar: FC<NavbarProps> = ({ children, session }) => {
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
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <Image
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                width={100}
                height={100}
                alt=""
              />
              <span className="ml-4 hidden lg:flex lg:items-center">
                {/* {status === "authenticated" && (
                  <> */}
                <span
                  className="pr-2 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {session.user?.name ?? session.user?.email ?? "Guest"}
                </span>

                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                <span
                  className="pl-2 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {session.user?.tn ?? "No Company"}
                </span>
                {/* </>
                )} */}
                {/* {status === "loading" && (
                  <>
                    <span
                      className="text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                    >
                      Loading...
                    </span>
                  </>
                )} */}
                {/* {status === "unauthenticated" && (
                  <>
                    <span
                      className="text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                    >
                      No User & No Company
                    </span>
                  </>
                )} */}
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        href={item.href}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900",
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};
