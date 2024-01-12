/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MenuButton = (props: any) => {
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
