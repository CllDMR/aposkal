import type { DetailedHTMLProps, FC, SelectHTMLAttributes } from "react";
import { forwardRef } from "react";
import clsx from "clsx";

export type SelectSize = "medium" | "large";

export type SelectProps = {
  id: string;
  name: string;
  label: string;
  size?: SelectSize;
  className?: string;
} & Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "size" | "ref"
>;

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in SelectSize]: string } = {
  medium: "p-3 text-base",
  large: "p-4 text-base",
};

export const Select: FC<SelectProps> = forwardRef<
  HTMLSelectElement,
  SelectProps
>(
  (
    {
      id,
      name,
      label,
      size = "medium",
      className = "",
      placeholder,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <select
        id={id}
        ref={ref}
        name={name}
        aria-label={label}
        placeholder={placeholder}
        className={clsx([
          "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          sizeMap[size],
          className,
        ])}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "SelectField";
