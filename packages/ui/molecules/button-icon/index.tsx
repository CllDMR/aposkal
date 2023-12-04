import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import clsx from "clsx";

enum ButtonIconVariant {
  PRIMARY,
  SECONDARY,
  ACCENT,
  ERROR,
  WARNING,
  SUCCESS,
  INFO,
}

enum ButtonIconSize {
  LARGE,
  SMALL,
}

const VARIANT_MAPS: Record<ButtonIconVariant, string> = {
  [ButtonIconVariant.PRIMARY]:
    "bg-primary-100 text-primary-800 hover:bg-primary-500 focus-visible:outline-primary-600",
  [ButtonIconVariant.SECONDARY]:
    "bg-secondary-100 text-secondary-800 hover:bg-secondary-500 focus-visible:outline-secondary-600",
  [ButtonIconVariant.ACCENT]:
    "bg-accent-100 text-accent-800 hover:bg-accent-500 focus-visible:outline-accent-600",
  [ButtonIconVariant.SUCCESS]:
    "bg-success-100 text-success-800 hover:bg-success-500 focus-visible:outline-success-600",
  [ButtonIconVariant.INFO]:
    "bg-info-100 text-info-800 hover:bg-info-500 focus-visible:outline-info-600",
  [ButtonIconVariant.WARNING]:
    "bg-warning-100 text-warning-800 hover:bg-warning-500 focus-visible:outline-warning-600",
  [ButtonIconVariant.ERROR]:
    "bg-danger-100 text-danger-800 hover:bg-danger-500 focus-visible:outline-danger-600",
};

type HTMLButtonIconProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonIconProps {
  children?: ReactNode;

  // UI
  type?: HTMLButtonIconProps["type"];
  variant?: ButtonIconVariant;

  // State
  disabled?: HTMLButtonIconProps["disabled"];
  // isLoading?: boolean;

  //Functionality
  onClick?: HTMLButtonIconProps["onClick"];
}

export function ButtonIcon({
  children,
  type,
  variant = ButtonIconVariant.PRIMARY,
  disabled = false,
  onClick,
}: ButtonIconProps) {
  const css = clsx(
    "rounded-full p-1 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-disabled-500 disabled:text-gray-400",
    VARIANT_MAPS[variant],

    {},
  );

  return (
    <button className={css} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

ButtonIcon.variant = ButtonIconVariant;
ButtonIcon.size = ButtonIconSize;
