"use client";

import type { FC } from "react";

import { Logo } from "~/components/landing";
import { sidebarItems } from "~/utils/sidebaritems";
import packageJson from "../../../../package.json";
import { Menu } from "./Menu";

export const SideBar: FC = () => {
  return (
    <div className="flex h-full grow flex-col gap-y-5 overflow-y-auto border-r bg-slate-100 pb-4">
      <div className="mx-auto my-8 space-y-3 ">
        <div className="flex h-full ">
          <Logo width={125} />
        </div>
        <div>
          <p className="-mt-4 text-center text-sm font-medium text-secondary">
            Muhasebe
          </p>
          <p className="text-center text-sm font-medium text-red-600 ">
            Beta{" "}
            <span className="mt-1 text-center text-xs text-gray-500">
              {packageJson.version}
            </span>
          </p>
        </div>
      </div>

      <nav className="mt-1 flex h-full flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            {sidebarItems
              .filter((item) => item.location !== "bottom")
              .map((item, index) => (
                <Menu key={index} item={item} index={index} />
              ))}
          </li>

          <li className="mt-auto">
            {sidebarItems
              .filter((item) => item.location === "bottom")
              .map((item, index) => (
                <Menu key={index} item={item} index={index} />
              ))}
          </li>
        </ul>
      </nav>
    </div>
  );
};
