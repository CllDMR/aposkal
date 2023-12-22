"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useSidebarStore } from "../../store/sidebar";
import { cn } from "../../utils/cn";
import type { DrawerNavigationPath } from "../drawer";

export function DrawerMobileWrapper({
  navigationPaths,
}: {
  navigationPaths: DrawerNavigationPath[];
}) {
  const { open, setOpen } = useSidebarStore();
  const pathname = usePathname();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex w-full bg-gray-100 lg:fixed lg:inset-y-0 lg:z-20 lg:hidden lg:flex-col">
                <div className="flex w-full grow flex-col gap-y-5 overflow-y-auto px-0">
                  <div className="mx-auto flex shrink-0 items-center pb-3 pt-10">
                    <Image
                      className="h-16 w-auto"
                      src="/logo.svg"
                      width={286.3}
                      height={141.73}
                      alt="Company Logo"
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
                                "group  flex gap-x-3 p-2 text-sm font-medium leading-6 text-gray-700",
                                {
                                  "bg-gray-50": pathname.includes(item.href),
                                  "hover:bg-gray-50": !pathname.includes(
                                    item.href,
                                  ),
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
                                        "bg-gray-50": pathname.includes(
                                          item.href,
                                        ),
                                        "hover:bg-gray-50": !pathname.includes(
                                          item.href,
                                        ),
                                      },
                                    )}
                                  >
                                    {item.icon}

                                    {item.name}
                                    <ChevronRightIcon
                                      className={cn(
                                        "ml-auto h-5 w-5 shrink-0",
                                        {
                                          "rotate-90 text-gray-500": open,
                                          "text-gray-400": !open,
                                        },
                                      )}
                                      aria-hidden="true"
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel as="ul" className="mt-1">
                                    {item.children?.map((subItem) => (
                                      <li key={subItem.name}>
                                        {/* 44px */}
                                        <Disclosure.Button
                                          as="div"
                                          className={cn("block ", {
                                            "bg-gray-50":
                                              pathname === subItem.href,
                                            "hover:bg-gray-50":
                                              pathname !== subItem.href,
                                          })}
                                        >
                                          <Link
                                            className="block py-2 pl-9 text-sm font-medium leading-6 text-gray-600"
                                            href={subItem.href}
                                            onClick={() => setOpen(false)}
                                          >
                                            <span className="pl-4">
                                              {subItem.name}
                                            </span>
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
