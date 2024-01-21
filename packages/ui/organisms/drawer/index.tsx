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
  location?: "bottom";
  children?: { name: string; href: string; icon?: ReactElement }[];
}

export function Drawer({
  navigationPaths,
  packageJsonVersion
}: {
  navigationPaths: DrawerNavigationPath[];
  packageJsonVersion: string;
}) {
  const setOpen = useSidebarStore((store) => store.setOpen);
  const pathname = usePathname();
  const nonBottomNavigationPaths = navigationPaths.filter(
    (e) => e.location !== "bottom",
  );
  const bottomNavigationPaths = navigationPaths.filter(
    (e) => e.location === "bottom",
  );

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-20 lg:flex lg:w-52 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-0">
        <div className="mx-auto flex shrink-0 items-center pt-10">
          <Image
            className="h-16 w-auto"
            src="/logo.svg"
            width={286.3}
            height={141.73}
            alt="Aposkal Logo"
            priority
          />
        </div>
        <p className="text-danger-600 text-center text-sm font-medium ">
          Beta{" "}
          <span className="text-center text-xs text-gray-500">
            {packageJsonVersion}
          </span>
        </p>
        <nav className="flex flex-1 flex-col">
          <ul className="flex-1">
            {nonBottomNavigationPaths.map((item) => (
              <li key={item.name}>
                {!item.children ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex gap-x-3 border-b border-gray-100 p-2 text-sm font-medium leading-6 text-gray-700",
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
                            "flex w-full items-center gap-x-3 border-b border-gray-100 p-2 text-left text-sm font-medium leading-6 text-gray-700",
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
                        <Disclosure.Panel as="ul" className="pt-1">
                          {item.children?.map((subItem) => (
                            <li key={subItem.name}>
                              {/* 44px */}
                              {subItem.icon ? subItem.icon : null}

                              <Disclosure.Button
                                as="div"
                                className={cn(
                                  pathname === subItem.href
                                    ? "bg-gray-50"
                                    : "hover:bg-gray-50",
                                  "block border-b border-gray-100",
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
          <ul className="">
            {bottomNavigationPaths.map((item) => (
              <li key={item.name}>
                {!item.children ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex gap-x-3 border-b border-gray-100 p-2 text-sm font-medium leading-6 text-gray-700",
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
                            "flex w-full items-center gap-x-3 border-b border-gray-100 p-2 text-left text-sm font-medium leading-6 text-gray-700",
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
                        <Disclosure.Panel as="ul" className="pt-1">
                          {item.children?.map((subItem) => (
                            <li key={subItem.name}>
                              {/* 44px */}
                              {subItem.icon ? subItem.icon : null}

                              <Disclosure.Button
                                as="div"
                                className={cn(
                                  pathname === subItem.href
                                    ? "bg-gray-50"
                                    : "hover:bg-gray-50",
                                  "block border-b border-gray-100",
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
