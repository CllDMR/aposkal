"use client";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { forwardRef } from "react";

function TextArea({ type = "text", label, ...rest }, ref) {
  let className =
    "block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6 outline-none";

  if (rest.error) {
    className =
      "block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 outline-none";
  }

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <textarea type={type} className={className} ref={ref} {...rest} />

      <InputError className="mt-1" error={rest.error} />
    </div>
  );
}

export default forwardRef(TextArea);

function InputError({ error, className = "" }) {
  if (error)
    return (
      <div className={className}>
        <div
          className=" flex w-full py-1 text-xs text-red-600 "
          id="email-error"
        >
          <ExclamationTriangleIcon
            className="mr-1 h-4  w-4 text-red-500 "
            aria-hidden="true"
          />
          {error}
        </div>
      </div>
    );

  return null;
}
