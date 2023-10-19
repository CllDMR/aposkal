import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import clsx from "clsx";

export type InputSize = "medium" | "large";

export type InputProps = {
  id: string;
  name: string;
  label?: string;
  size?: InputSize;
  className?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size" | "ref"
>;

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in InputSize]: string } = {
  medium: "p-3 text-base",
  large: "p-4 text-base",
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = "text",
      size = "medium",
      className = "",
      placeholder,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        className={clsx([
          "focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
          sizeMap[size],
          className,
        ])}
        {...props}
      />
    );
  },
);

Input.displayName = "InputField";
