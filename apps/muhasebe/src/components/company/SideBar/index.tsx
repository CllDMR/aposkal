"use client";

import type { FC } from "react";

import { sidebarItems } from "@acme/util";

import { Logo } from "~/components/landing";
// import packageJson from "../../../../package.json";
import { Menu } from "./Menu";

export const SideBar: FC = () => {
  const nonBottomItems = sidebarItems.filter(
    (item) => item.location !== "bottom",
  );
  const bottomItems = sidebarItems.filter((item) => item.location === "bottom");

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
            {/* <span className="mt-1 text-center text-xs text-gray-500">
              {packageJson.version}
            </span> */}
          </p>
        </div>
      </div>

      <nav className="mt-1 flex h-full flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            {nonBottomItems.map((item, index) => (
              <Menu key={index} item={item} index={index} />
            ))}
          </li>

          <li className="mt-auto">
            {bottomItems.map((item, index) => (
              <Menu
                key={index + nonBottomItems.length}
                item={item}
                index={index}
              />
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
};
