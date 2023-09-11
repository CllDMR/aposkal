import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "../../utils/cn";

enum LinkButtonVariant {
  ERROR,
  WARNING,
  SUCCESS,
  INFO,
}

enum LinkButtonSize {
  LARGE,
  SMALL,
}

const SIZE_MAPS: Record<LinkButtonSize, string> = {
  [LinkButtonSize.SMALL]: "px-2.5 text-xs",
  [LinkButtonSize.LARGE]: "px-3 text-sm",
};

const VARIANT_MAPS: Record<LinkButtonVariant, string> = {
  [LinkButtonVariant.SUCCESS]:
    "bg-success-100 text-success-800 hover:bg-success-500 focus-visible:outline-success-600",
  [LinkButtonVariant.INFO]:
    "bg-info-100 text-info-800 hover:bg-info-500 focus-visible:outline-info-600",
  [LinkButtonVariant.WARNING]:
    "bg-warning-100 text-warning-800 hover:bg-warning-500 focus-visible:outline-warning-600",
  [LinkButtonVariant.ERROR]:
    "bg-danger-100 text-danger-800 hover:bg-danger-500 focus-visible:outline-danger-600",
};

interface LinkButtonProps {
  children?: ReactNode;

  // UI
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;

  // State
  disabled?: boolean;
  href: string;

  //Functionality
}

export function LinkButton({
  children,
  variant = LinkButtonVariant.INFO,
  size = LinkButtonSize.SMALL,
  disabled = false,
  href,
}: LinkButtonProps) {
  const css = cn(
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    VARIANT_MAPS[variant],
    SIZE_MAPS[size],

    { "bg-disabled-600": disabled },
  );

  return (
    <Link className={css} href={href} passHref aria-disabled={disabled}>
      {children}
    </Link>
  );
}

LinkButton.variant = LinkButtonVariant;
LinkButton.size = LinkButtonSize;
