"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import { useSidebarStore } from "../../store/sidebar";
import { cn } from "../../utils/cn";

export interface DrawerNavigationPath {
  name: string;
  href: string;
  icon: ReactElement;
  children?: { name: string; href: string }[];
}

export function Drawer({
  navigationPaths,
}: {
  navigationPaths: DrawerNavigationPath[];
}) {
  const setOpen = useSidebarStore((store) => store.setOpen);
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-20 lg:flex lg:w-60 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gray-100 px-0">
        <div className="mx-auto flex shrink-0 items-center pb-3 pt-10">
          <Image
            className="h-16 w-auto"
            src="/logo.svg"
            width={286.3}
            height={141.73}
            alt="Aposkal Logo"
            priority
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul className="space-y-1">
            {navigationPaths.map((item) => (
              <li key={item.name}>
                {!item.children ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex gap-x-3 p-2 text-sm font-medium leading-6 text-gray-700",
                      {
                        "bg-gray-50": pathname.includes(item.href),
                        "hover:bg-gray-50": !pathname.includes(item.href),
                      },
                    )}
                  >
                    {item.icon}

                    {item.name}
                  </Link>
                ) : (
                  <Disclosure
                    as="div"
                    defaultOpen={pathname.includes(item.href)}
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={cn(
                            "flex w-full items-center gap-x-3  p-2 text-left text-sm font-medium leading-6 text-gray-700",
                            {
                              "bg-gray-50": pathname.includes(item.href),
                              "hover:bg-gray-50": !pathname.includes(item.href),
                            },
                          )}
                        >
                          {item.icon}

                          {item.name}
                          <ChevronRightIcon
                            className={cn("ml-auto h-5 w-5 shrink-0", {
                              "rotate-90 text-gray-500": open,
                              "text-gray-400": !open,
                            })}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel as="ul" className="mt-1">
                          {item.children?.map((subItem) => (
                            <li key={subItem.name}>
                              {/* 44px */}
                              <Disclosure.Button
                                as="div"
                                className={cn(
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
    </div>
  );
}
