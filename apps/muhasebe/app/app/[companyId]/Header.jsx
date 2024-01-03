// "use client";
// import { Bars3Icon } from "@heroicons/react/24/outline";
import BreacCrumb from "./BreadCrumb";

import ProfileMenu from "./ProfileMenu";
export default function Header({ session, company }) {
  return (
    <div className=" z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-slate-100 px-4 py-3  sm:px-5 lg:px-5">
      {/* <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button> */}

      {/* Separator */}
      {/* <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" /> */}

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1 ">
          {/* header right side */}

          <BreacCrumb homeElement={"Home"} separator={<span> | </span>} />
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
          </button>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          />

          <ProfileMenu session={session} company={company} />

          {/* Profile dropdown */}
        </div>
      </div>
    </div>
  );
}
