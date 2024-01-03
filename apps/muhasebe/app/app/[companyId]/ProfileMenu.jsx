"use client";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const userNavigation = [
  { name: "Profil", href: "#" },
  { name: "Firma Değiştir", href: "/app" },
  // { name: "Firma Ekle", href: "/app/createCompany" },
  { name: "Çıkış Yap", href: "/auth/signout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileMenu = ({ session, company }) => {
  if (!session || !session?.user?.name) return null;

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full bg-gray-50"
            src={session.user.image}
            alt="profile picture"
            width={32}
            height={32}
          />
          <span className="hidden lg:flex lg:items-center">
            <span
              className="ml-4 text-sm font-semibold leading-6 text-gray-900 truncate max-w-32"
              aria-hidden="true"
            >
              {session.user.name}

              <span className="truncate block text-left text-sm text-gray-500">
                {company.data.title}
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
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
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

export default ProfileMenu;
