"use client";

import type { Dispatch, FC, SetStateAction } from "react";
import { Switch } from "@headlessui/react";
import clsx from "clsx";

interface ToggleProps {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  label: string;
  type?: "label-left";
}

export const Toggle: FC<ToggleProps> = ({
  enabled,
  setEnabled,
  label,
  type,
}) => {
  if (type === "label-left")
    return (
      <Switch.Group as="div" className="flex items-center">
        {label && (
          <Switch.Label as="span" className="mr-3">
            <span className="text-sm text-teal-900">{label} </span>
          </Switch.Label>
        )}
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={clsx(
            "relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            enabled ? "bg-secondary" : "bg-gray-200",
          )}
        >
          <span
            aria-hidden="true"
            className={clsx(
              "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              enabled ? "translate-x-5" : "translate-x-0",
            )}
          />
        </Switch>
      </Switch.Group>
    );

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={clsx(
          "relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          enabled ? "bg-secondary" : "bg-gray-200",
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            enabled ? "translate-x-5" : "translate-x-0",
          )}
        />
      </Switch>
      {label && (
        <Switch.Label as="span" className="ml-3">
          <span className="text-sm text-gray-900">{label} </span>
        </Switch.Label>
      )}
    </Switch.Group>
  );
};
