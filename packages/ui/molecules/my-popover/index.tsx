"use client";

import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type { MouseEvent, MutableRefObject, ReactNode } from "react";

interface MyPopoverProps {
  children: (
    close: (
      focusableElement?:
        | HTMLElement
        | MutableRefObject<HTMLElement | null>
        | MouseEvent<HTMLElement, globalThis.MouseEvent>
        | undefined,
    ) => void,
  ) => ReactNode;
  title: ReactNode;
}

export function MyPopover({ children,title }: MyPopoverProps) {

  return (
    <Popover as="div" className="relative inline-block text-left">
      {({ close }) => (
        <>
        
          <Popover.Button className="inline-flex w-full border rounded-md justify-center px-2 py-2 text-sm font-medium text-gray-500  hover:rounded-l-md hover:bg-gray-50 ">
            {title}
            {/* Filtre */}
            <ChevronDownIcon className=" h-5 w-5" aria-hidden="true" />
          </Popover.Button>

          <Popover.Panel className="absolute   z-50 mt-2  w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-0">
            {children(close)}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
