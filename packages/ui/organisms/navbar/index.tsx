"use client";

import type { FC, PropsWithChildren } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import type { Session } from "next-auth";

import { useSidebarStore } from "../../store/sidebar";

type NavbarProps = PropsWithChildren & {
  session: Session;
  navigationPaths: NavbarNavigationPath[];
  domain: string;
};

export interface NavbarNavigationPath {
  name: string;
  href: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
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

const solutions = [
  {
    name: "Membership Manager",
    description: "Control your accounts, users, organizations and billing",
    subdomain: "account",
    port: "3000",
    pathname: "/",
    icon: IconOne,
  },
  {
    name: "Inventory Manager",
    description: "Keep your products organized",
    subdomain: "inventory",
    port: "3001",
    pathname: "/dashboard",
    icon: IconTwo,
  },
  {
    name: "Logistic Manager",
    description: "Track and analyze your logictics",
    subdomain: "logistic",
    port: "3002",
    pathname: "/dashboard",
    icon: IconThree,
  },
  {
    name: "Order Manager",
    description: "Interact with your orders of customers and suppliers",
    subdomain: "order",
    port: "3003",
    pathname: "/dashboard",
    icon: IconThree,
  },
  {
    name: "Customer Manager",
    description: "Manage and track relationships with your customers",
    subdomain: "customer",
    port: "3004",
    pathname: "/dashboard",
    icon: IconThree,
  },
];

const AppsDropdown: FC<{ domain: string }> = ({ domain }) => (
  <Popover className="relative">
    {({ open }) => (
      <>
        <Popover.Button
          className={`
            ${open ? "" : "text-opacity-90"}
            group inline-flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-400 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-opacity-75`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                {solutions.map((item) => (
                  <a
                    key={item.name}
                    href={
                      process.env.NODE_ENV === "production"
                        ? "https://" +
                          item.subdomain +
                          "." +
                          domain +
                          item.pathname
                        : "http://localhost:" + item.port + item.pathname
                    }
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                      <item.icon aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="bg-gray-50 p-4">
                <a
                  href="##"
                  className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-50"
                >
                  <span className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      Documentation
                    </span>
                  </span>
                  <span className="block text-sm text-gray-500">
                    Start integrating products and tools
                  </span>
                </a>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}

interface ProfileDropdownProps {
  session: Session;
  navigationPaths: NavbarNavigationPath[];
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({
  navigationPaths,
  session,
}) => {
  let basePath = "";
  if (typeof window !== "undefined") basePath = window?.location.origin;

  const pathName = usePathname();

  return (
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
          {navigationPaths.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  // href={item.href}
                  href={
                    item.href +
                    "?callbackUrl=" +
                    encodeURIComponent(basePath + pathName)
                  }
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
  );
};
