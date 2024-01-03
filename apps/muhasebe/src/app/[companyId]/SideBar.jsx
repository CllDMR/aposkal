"use client";

import { useRef } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Logo } from "@/components/landing/Logo";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

import packageJson from "../../../package.json";
import sidebarItems from "./sidebaritems";

export default function SideBar({ company }) {
  const params = useParams();

  const navigation = sidebarItems(params.companyId);

  return (
    <div className="bg-slate-100 flex h-full grow flex-col gap-y-5 overflow-y-auto border-r pb-4">
      <div className="mx-auto my-8 space-y-3 ">
        <div className="flex h-full ">
          <Logo width={125} />
        </div>
        <div>
          <p className="text-secondary -mt-4 text-center text-sm font-medium">
            Muhasebe
          </p>
          <p className="text-red-600 text-center text-sm font-medium ">
            Beta{" "}
            <span className="mt-1 text-center text-xs text-gray-500">
              {packageJson.version}
            </span>
          </p>
        </div>
      </div>

      <nav className="mt-1 flex h-full flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            {navigation
              .filter((item) => item.location !== "bottom")
              .map((item, index) => (
                <Menu key={index} item={item} index={index} />
              ))}
          </li>

          <li className="mt-auto">
            {navigation
              .filter((item) => item.location === "bottom")
              .map((item, index) => (
                <Menu key={index} item={item} index={index} />
              ))}
          </li>
        </ul>
      </nav>
    </div>
  );
}

const Menu = ({ item, index }) => {
  const currentPath = usePathname();
  const buttonRefs = useRef([]);
  const openedRef = useRef(null);

  const activeClass = "bg-gray-100 text-gray-900 ";
  const activeClass2 = "bg-gray-300 text-gray-900 ";
  const subMenuClass = "text-xs bg-gray-200 ";

  const inActiveClass = "text-gray-600 ";
  const linkClass = "group flex items-center px-4 py-2 font-medium";

  const clickRecent = (index) => {
    const clickedButton = buttonRefs.current[index];
    if (clickedButton === openedRef.current) {
      openedRef.current = null;
      return;
    }
    if (Boolean(openedRef.current?.getAttribute("data-value"))) {
      openedRef.current?.click();
    }
    openedRef.current = clickedButton;
  };
  return (
    <Disclosure key={index}>
      {({ open }) => {
        return (
          <div className="border-b-2 border-gray-50" key={index}>
            <Disclosure.Button className="w-full" as="div">
              {item.children ? (
                <div
                  // close others
                  data-value={open}
                  ref={(ref) => {
                    buttonRefs.current[index] = ref;
                  }}
                  onClick={() => clickRecent(index)}
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
              {item.children &&
                item.children.map((subItem) => (
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
                ))}
            </Disclosure.Panel>
          </div>
        );
      }}
    </Disclosure>
  );
};

const MenuButton = (props) => {
  const { item, size = "5", open } = props;
  return (
    <>
      <div className="flex py-0.5">
        {item.icon && (
          <item.icon
            className={`${
              item.current
                ? "text-gray-500"
                : "text-gray-400 group-hover:text-gray-500"
            }  mr-3 h-${size} w-${size} flex-shrink-0`}
            aria-hidden="true"
          />
        )}
        {item.name}
      </div>
      {item.children && !open && (
        <ChevronDownIcon
          className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      )}

      {item.children && open && (
        <ChevronUpIcon
          className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      )}
    </>
  );
};
