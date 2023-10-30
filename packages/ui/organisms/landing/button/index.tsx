"use client";

import type { FC, PropsWithChildren } from "react";
import Link from "next/link";
import clsx from "clsx";

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
};

const variantStyles = {
  solid: {
    slate:
      "bg-gray-900 text-white hover:bg-gray-700 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-900",
    blue: "bg-primary-600 text-white hover:text-gray-100 hover:bg-primary-500 active:bg-primary-800 active:text-primary-100 focus-visible:outline-primary-600",
    white:
      "bg-white text-gray-900 hover:bg-primary-50 active:bg-primary-200 active:text-gray-600 focus-visible:outline-white",
  },
  outline: {
    slate:
      "ring-gray-200 text-gray-700 hover:text-gray-900 hover:ring-gray-300 active:bg-gray-100 active:text-gray-600 focus-visible:outline-primary-600 focus-visible:ring-gray-300",
    blue: "",
    white:
      "ring-gray-700 text-white hover:ring-gray-500 active:ring-gray-700 active:text-gray-400 focus-visible:outline-white",
  },
};

interface ButtonProps extends PropsWithChildren {
  variant?: "solid" | "outline";
  color?: "slate" | "white" | "blue";
  className?: string;
  href: string;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  variant = "solid",
  color = "slate",
  className,
  href,
  disabled,
  ...props
}) => {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    disabled && "opacity-50 cursor-not-allowed",

    className,
  );

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  );
};
