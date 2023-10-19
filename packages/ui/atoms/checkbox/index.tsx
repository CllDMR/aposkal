import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import clsx from "clsx";

export type CheckboxSize = "medium" | "large";

export type CheckboxProps = {
  id: string;
  name: string;
  label?: string;
  size?: CheckboxSize;
  className?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size" | "ref" | "type"
>;

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in CheckboxSize]: string } = {
  medium: "p-3 text-base",
  large: "p-4 text-base",
};

export const Checkbox: FC<CheckboxProps> = forwardRef<
  HTMLInputElement,
  CheckboxProps
>(
  (
    {
      id,
      name,
      label,
      size = "medium",
      className = "",
      placeholder,
      // children,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type="checkbox"
        aria-label={label}
        placeholder={placeholder}
        className={clsx([
          "rounded border border-gray-300 bg-gray-50 leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out hover:border-primary-400 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-400 focus:ring-opacity-30",
          sizeMap[size],
          className,
        ])}
        {...props}
      />
    );
  },
);

Checkbox.displayName = "CheckboxField";
