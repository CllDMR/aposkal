"use client";

import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import clsx from "clsx";

enum ButtonVariant {
  PRIMARY,
  SECONDARY,
  TERTIARY,
  DANGER,
  WARNING,
}

enum ButtonSize {
  SMALL,
  MEDIUM,
  LARGE,
}

const SIZE_MAPS: Record<ButtonSize, string> = {
  [ButtonSize.LARGE]: "px-6 py-3 text-base",
  [ButtonSize.MEDIUM]: "px-4 py-2 text-sm font-medium",
  [ButtonSize.SMALL]: "px-2.5 py-1.5 text-xs",
};

const VARIANT_MAPS: Record<ButtonVariant, string> = {
  [ButtonVariant.PRIMARY]:
    "bg-teal-600 text-white hover:brightness-95 focus:ring-primary",
  [ButtonVariant.SECONDARY]:
    "bg-teal-100 text-teal-700 hover:brightness-95 focus:ring-secondary",
  [ButtonVariant.TERTIARY]:
    "focus:ring-tertiary  text-teal-700 hover:brightness-95",
  [ButtonVariant.DANGER]:
    "bg-red-600 text-white hover:brightness-95 focus:ring-primary",
  [ButtonVariant.WARNING]:
    "bg-orange-600 text-white hover:brightness-95 focus:ring-primary",
};

type HTMLButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps {
  loading?: boolean;
  children?: HTMLButtonProps["children"];
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: HTMLButtonProps["className"];
  type?: HTMLButtonProps["type"];
  disabled?: HTMLButtonProps["disabled"];
  onClick?: HTMLButtonProps["onClick"];
}

export const Button = ({
  loading = false,
  children,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.SMALL,
  className,
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "inline-flex justify-center rounded-md border border-transparent shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2",
        className,
        VARIANT_MAPS[variant],
        SIZE_MAPS[size],

        {
          "opacity-50": disabled || loading,
        },
      )}
      {...rest}
    >
      {loading && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {/* <LockClosedIcon className="w-5 h-5 text-primary group-hover:text-primary" aria-hidden="true" /> */}
          <Loader colorName="white" />
        </span>
      )}
      {children}
    </button>
  );
};

Button.variant = ButtonVariant;
Button.size = ButtonSize;

interface LoaderProps {
  type?: "1" | "2";
  className?: string;
  colorName?: "white" | "secondary";
}

const Loader: FC<LoaderProps> = ({ type, className = "", colorName }) => {
  let color = "#34BE82";
  if (colorName === "secondary") color = "#2F86A6";
  if (colorName === "white") color = "#fff";

  const defaultClass = "h-full";

  if (type === "1")
    return (
      <svg
        version="1.1"
        id="L4"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
        className={className + " " + defaultClass}
      >
        <circle fill={color} stroke="none" cx="6" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle fill={color} stroke="none" cx="26" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle fill={color} stroke="none" cx="46" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>
    );

  if (type === "2")
    return (
      <svg
        className={className + " " + defaultClass}
        version="1.1"
        id="L5"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
      >
        <circle fill={color} stroke="none" cx="6" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 15 ; 0 -15; 0 15"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle fill={color} stroke="none" cx="30" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 10 ; 0 -10; 0 10"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle fill={color} stroke="none" cx="54" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>
    );

  return (
    <svg
      className={className + " " + defaultClass}
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};
