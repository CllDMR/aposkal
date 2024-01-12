import type { FC } from "react";

import type { Session } from "@acme/auth";

import { BreadCrumb } from "./BreadCrumb";
import { ProfileMenu } from "./ProfileMenu";

interface HeaderProps {
  session: Session;
  tenantName: string;
}

export const Header: FC<HeaderProps> = ({ session, tenantName }) => {
  return (
    <div className="z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-slate-100 px-4 py-3 sm:px-5 lg:px-5">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1 ">
          {/* <BreadCrumb homeElement={"Home"} separator={<span> | </span>} /> */}
          <BreadCrumb />
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
          </button>

          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          />

          <ProfileMenu session={session} tenantName={tenantName} />
        </div>
      </div>
    </div>
  );
};
