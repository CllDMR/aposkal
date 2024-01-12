"use client";

import { forwardRef, useId } from "react";
import clsx from "clsx";

const formClasses =
  "block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm";

interface SelectFieldProps {
  className: string;
  label: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, className, ...rest }, ref) => {
    const id = useId();

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={id}
            className="mb-3 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <select
          id={id}
          className={clsx(formClasses, "pr-8")}
          ref={ref}
          {...rest}
        />
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
