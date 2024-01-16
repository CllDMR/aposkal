"use client";

import type { FC } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import type { Session } from "@acme/auth";

const userNavigation = [
  { name: "Profil", href: "#" },
  { name: "Firma Değiştir", href: "/auth/select-company" },
  // { name: "Firma Ekle", href: "/app/createCompany" },
  { name: "Çıkış Yap", href: "/auth/logout" },
];

interface ProfileMenuProps {
  session: Session;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tenantName: any;
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ session, tenantName }) => {
  if (!session?.user?.name) return null;

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          {session.user.image ? (
            <Image
              className="h-8 w-8 rounded-full bg-gray-50"
              // TODO: Add default user image
              src={session.user.image}
              alt="profile picture"
              width={32}
              height={32}
            />
          ) : null}
          <span className="hidden lg:flex lg:items-center">
            <span
              className="max-w-32 ml-4 truncate text-sm font-semibold leading-6 text-gray-900"
              aria-hidden="true"
            >
              {session.user.name}

              <span className="block truncate text-left text-sm text-gray-500">
                {tenantName}
              </span>
            </span>

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
                    className={clsx(
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
    </>
  );
};
