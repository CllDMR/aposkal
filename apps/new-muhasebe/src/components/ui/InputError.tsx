"use client";

import type { FC } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

interface InputErrorProps {
  error?: string;
  className?: string;
}

export const InputError: FC<InputErrorProps> = ({ error, className = "" }) => {
  if (error)
    return (
      <div className={className}>
        <div
          className="flex w-full py-1 text-xs text-red-600 "
          id="email-error"
        >
          <ExclamationTriangleIcon
            className="mr-1 h-4 w-4 text-red-500"
            aria-hidden="true"
          />
          {error}
        </div>
      </div>
    );

  return null;
};
