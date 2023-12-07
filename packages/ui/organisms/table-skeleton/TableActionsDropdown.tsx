import type { FC, ReactNode } from "react";
import { Fragment, useId } from "react";
import { Menu, Transition } from "@headlessui/react";

export interface TableActionsDropdownOption {
  label: string;
  icon: ReactNode;
}

interface TableActionsDropdownProps {
  optionsMatrix?: TableActionsDropdownOption[][];
}

export const TableActionsDropdown: FC<TableActionsDropdownProps> = ({
  optionsMatrix = [],
}) => {
  const id = useId();

  return (
    <Menu as="div" className="relative inline-flex text-left">
      <Menu.Button className="inline-flex justify-center rounded-full bg-black/20 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
            clipRule="evenodd"
          />
        </svg>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {optionsMatrix.map((options, optionMatrixIndex) => (
            <div key={id + String(optionMatrixIndex)} className="px-1 py-1">
              {options.map(({ icon, label }, optionIndex) => (
                <Menu.Item
                  key={id + String(optionMatrixIndex) + String(optionIndex)}
                >
                  <button
                    type="button"
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-primary-500 ui-active:text-white ui-not-active:text-gray-900"
                    disabled
                  >
                    {icon}
                    {label}
                  </button>
                </Menu.Item>
              ))}
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
