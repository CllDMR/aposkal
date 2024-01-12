"use client";

import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from "react";
import clsx from "clsx";

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
  link: "",
};

const variantStyles = {
  solid: {
    slate:
      "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
    blue: "bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",
    white:
      "bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white",
  },
  outline: {
    slate:
      "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
    blue: "",
    white:
      "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
  },
  link: {
    slate: "",
    blue: "",
    white: "",
  },
};

type TVariant = keyof typeof baseStyles;

type Button = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "color"
>;

interface ButtonProps extends Button {
  variant?: TVariant;
  color?: keyof (typeof variantStyles)[TVariant];
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  variant = "solid",
  color = "slate",
  ...props
}) => {
  const _className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className,
  );

  return <button className={_className} {...props} />;

  // return typeof href === "undefined" ? (
  //   <button className={_className} {...props} />
  // ) : (
  //   <Link href={href} className={_className} {...props} />
  // );
};
