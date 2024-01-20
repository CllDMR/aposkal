"use client";

import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export type InputProps = {
  id: string;
  name: string;
  label?: string;
  className?: string;
  error?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size" | "ref"
>;

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...rest }, ref) => {
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
        <input
          type={type}
          className={clsx(
            "focus:ring-teal-500 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
            className,
            {
              "ring-red-300  focus:ring-red-500  sm:leading-6": error,
            },
          )}
          ref={ref}
          {...rest}
        />
        <InputError className="mt-1" error={error} />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;

interface InputErrorProps {
  className?: string;
  error?: string;
}

const InputError: FC<InputErrorProps> = ({ error, className = "" }) => {
  if (error)
    return (
      <div className={className}>
        <div
          className="text-red-600 flex w-full py-1 text-xs "
          id="email-error"
        >
          <ExclamationTriangleIcon
            className="text-red-500 mr-1 h-4 w-4 "
            aria-hidden="true"
          />
          {error}
        </div>
      </div>
    );

  return null;
};
