"use client";
import clsx from "clsx";
import { forwardRef } from "react";

const formClasses =
  "block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm";

function Label({ id, children }) {
  return (
    <label
      htmlFor={id}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
}

function TextField({ label, type = "text", className, ...rest }, ref) {
  // let id = useId();

  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <input type={type} className={formClasses} {...rest} ref={ref} />
    </div>
  );
}

export function SelectField({ label, className, ...rest }, ref) {
  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <select {...rest} className={clsx(formClasses, "pr-8")} ref={ref} />
    </div>
  );
}

export default forwardRef(SelectField);