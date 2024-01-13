/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import type { UrlObject } from "url";
import type { FC, Key } from "react";
import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";

import { MenuButton } from "./MenuButton";

interface MenuProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  index: number;
}

export const Menu: FC<MenuProps> = ({ item, index }) => {
  const currentPath = usePathname();
  const buttonRefs = useRef<HTMLDivElement[] | null[] | undefined[]>([]);
  // const openedRef = useRef<HTMLDivElement | null | undefined>(null);

  const activeClass = "bg-gray-100 text-gray-900 ";
  const activeClass2 = "bg-gray-300 text-gray-900 ";
  const subMenuClass = "text-xs bg-gray-200 ";

  const inActiveClass = "text-gray-600 ";
  const linkClass = "group flex items-center px-4 py-2 font-medium";

  // const clickRecent = (index: number) => {
  //   const clickedButton = buttonRefs.current[index];
  //   if (clickedButton === openedRef.current) {
  //     openedRef.current = null;
  //     return;
  //   }
  //   if (openedRef.current?.getAttribute("data-value")) {
  //     openedRef.current?.click();
  //   }
  //   openedRef.current = clickedButton;
  // };

  return (
    <Disclosure key={index}>
      {({ open }) => {
        return (
          <div className="border-b-2 border-gray-50" key={index}>
            <Disclosure.Button className="w-full" as="div">
              {}
              {item.children ? (
                <div
                  // close others
                  data-value={open}
                  ref={(ref) => {
                    buttonRefs.current[index] = ref;
                  }}
                  // onClick={() => clickRecent(index)}
                  // close others
                  className={`${
                    open ? activeClass : inActiveClass
                  } group flex items-center justify-between px-4 py-2 text-sm font-medium`}
                >
                  <MenuButton item={item} open={open} />
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href || "#"}
                  className={linkClass + " text-sm " + inActiveClass}
                >
                  <MenuButton item={item} />
                </Link>
              )}
            </Disclosure.Button>
            <Disclosure.Panel className={activeClass}>
              {item.children?.map(
                (subItem: {
                  name: Key | null | undefined;
                  href: string | UrlObject;
                }) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className={`${
                      subItem.href === currentPath
                        ? activeClass2
                        : inActiveClass
                    }  ${linkClass}  ${subMenuClass}`}
                  >
                    <MenuButton item={subItem} size="4" />
                  </Link>
                ),
              )}
            </Disclosure.Panel>
          </div>
        );
      }}
    </Disclosure>
  );
};
