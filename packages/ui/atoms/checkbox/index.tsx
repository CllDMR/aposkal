import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import type { RefCallBack } from "react-hook-form";

export type CheckboxSize = "medium" | "large";

export type CheckboxProps = {
  id: string;
  name: string;
  label?: string;
  size?: CheckboxSize;
  className?: string;
  indeterminate?: boolean;
  innerRef?: RefCallBack;
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

export const Checkbox: FC<CheckboxProps> = ({
  id,
  name,
  label,
  size = "medium",
  className = "",
  placeholder,
  indeterminate = false,
  innerRef,
  // children,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean" && ref) {
      ref.current.indeterminate = !props.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      id={id}
      ref={(e) => {
        if (innerRef) innerRef(e);
        if (e) ref.current = e;
      }}
      name={name}
      type="checkbox"
      aria-label={label}
      placeholder={placeholder}
      className={clsx([
        "hover:border-primary-400 focus:border-primary-400 focus:ring-primary-400 rounded border border-gray-300 bg-gray-50 leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-30",
        sizeMap[size],
        className,
      ])}
      {...props}
    />
  );
};

Checkbox.displayName = "CheckboxField";
