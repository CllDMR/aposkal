"use client";

import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Toggle(props) {
  const { enabled, setEnabled, label, type } = props;

  if (type === "label-left")
    return (
      <Switch.Group as="div" className="flex items-center">
        {label && (
          <Switch.Label as="span" className="mr-3">
            <span className="text-teal-900 text-sm">{label} </span>
          </Switch.Label>
        )}
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? "bg-secondary" : "bg-gray-200",
            "focus:ring-primary relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
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
        className={classNames(
          enabled ? "bg-secondary" : "bg-gray-200",
          "focus:ring-primary relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
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
}
