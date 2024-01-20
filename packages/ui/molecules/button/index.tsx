import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import clsx from "clsx";

import { Loader } from "./Loader";

enum ButtonVariant {
  PRIMARY,
  SECONDARY,
  ACCENT,
  ERROR,
  WARNING,
  SUCCESS,
  INFO,
}

enum ButtonSize {
  LARGE,
  SMALL,
}

const SIZE_MAPS: Record<ButtonSize, string> = {
  [ButtonSize.SMALL]: "px-2.5 text-xs",
  [ButtonSize.LARGE]: "px-3 text-sm",
};

const VARIANT_MAPS: Record<ButtonVariant, string> = {
  [ButtonVariant.PRIMARY]:
    "bg-primary-100 text-primary-800 hover:bg-primary-500 focus-visible:outline-primary-600",
  [ButtonVariant.SECONDARY]:
    "bg-secondary-100 text-secondary-800 hover:bg-secondary-500 focus-visible:outline-secondary-600",
  [ButtonVariant.ACCENT]:
    "bg-accent-100 text-accent-800 hover:bg-accent-500 focus-visible:outline-accent-600",
  [ButtonVariant.SUCCESS]:
    "bg-success-100 text-success-800 hover:bg-success-500 focus-visible:outline-success-600",
  [ButtonVariant.INFO]:
    "bg-info-100 text-info-800 hover:bg-info-500 focus-visible:outline-info-600",
  [ButtonVariant.WARNING]:
    "bg-warning-100 text-warning-800 hover:bg-warning-500 focus-visible:outline-warning-600",
  [ButtonVariant.ERROR]:
    "bg-danger-100 text-danger-800 hover:bg-danger-500 focus-visible:outline-danger-600",
};

type HTMLButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps {
  children?: ReactNode;

  // UI
  type?: HTMLButtonProps["type"];
  variant?: ButtonVariant;
  size?: ButtonSize;

  // State
  fullwidth?: boolean;
  disabled?: HTMLButtonProps["disabled"];
  loading?: boolean;
  // isLoading?: boolean;

  //Functionality
  onClick?: HTMLButtonProps["onClick"];
}

export function Button({
  children,
  type,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.SMALL,
  disabled = false,
  loading = false,
  fullwidth = false,
  onClick,
}: ButtonProps) {
  const css = clsx(
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-disabled-500 disabled:text-gray-400",
    VARIANT_MAPS[variant],
    SIZE_MAPS[size],

    { "w-full": fullwidth },
  );

  return (
    <button className={css} type={type} disabled={disabled} onClick={onClick}>
      {loading && <Loader />}

      {children}
    </button>
  );
}

Button.variant = ButtonVariant;
Button.size = ButtonSize;
