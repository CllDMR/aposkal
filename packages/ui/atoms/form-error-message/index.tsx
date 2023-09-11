import type { FC, PropsWithChildren } from "react";
import clsx from "clsx";

export type FormErrorMessageProps = {
  className?: string;
} & PropsWithChildren;

export const FormErrorMessage: FC<FormErrorMessageProps> = ({
  children,
  className,
}) => (
  <p
    className={clsx(
      "block text-left font-serif text-sm text-red-600",
      className,
    )}
  >
    {children}
  </p>
);
