"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ArrowTrendingUpIcon, HomeIcon } from "@heroicons/react/24/outline";

import { useSidebarStore } from "~/store/sidebar";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Posts",
    href: "/posts",
    icon: ArrowTrendingUpIcon,
    children: [
      { name: "All", href: "/posts" },
      { name: "Create New", href: "/posts/create" },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Drawer() {
  const setOpen = useSidebarStore((store) => store.setOpen);
  const pathname = usePathname();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gray-100 px-0">
      <div className="mx-auto flex shrink-0 items-center pb-3 pt-10">
        <Image
          className="h-16 w-auto"
          src="/logo.svg"
          width={100}
          height={100}
          alt="Company Logo"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              {!item.children ? (
                <a
                  href={item.href}
                  className={classNames(
                    pathname.includes(item.href)
                      ? "bg-gray-50"
                      : "hover:bg-gray-50",
                    "group  flex   p-2 text-sm font-medium leading-6 text-gray-700",
                  )}
                >
                  <item.icon
                    className="ml-2 mr-3 h-5 w-5 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ) : (
                <Disclosure as="div" defaultOpen={pathname.includes(item.href)}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          pathname.includes(item.href)
                            ? "bg-gray-50"
                            : "hover:bg-gray-50",
                          "flex w-full items-center gap-x-3  p-2 text-left text-sm font-medium leading-6 text-gray-700",
                        )}
                      >
                        <item.icon
                          className="ml-2 h-6 w-6 shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                        <ChevronRightIcon
                          className={classNames(
                            open ? "rotate-90 text-gray-500" : "text-gray-400",
                            "ml-auto h-5 w-5 shrink-0",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel as="ul" className="mt-1">
                        {item.children.map((subItem) => (
                          <li key={subItem.name}>
                            {/* 44px */}
                            <Disclosure.Button
                              as="div"
                              className={classNames(
                                pathname === subItem.href
                                  ? "bg-gray-50"
                                  : "hover:bg-gray-50",
                                "block ",
                              )}
                            >
                              <Link
                                className="block py-2 pl-9 text-sm font-medium leading-6 text-gray-600"
                                href={subItem.href}
                                onClick={() => setOpen(false)}
                              >
                                <span className="pl-4">{subItem.name}</span>
                              </Link>
                            </Disclosure.Button>
                          </li>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
