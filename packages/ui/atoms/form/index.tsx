import type { FC, HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

type FormProps = HTMLAttributes<HTMLFormElement> & {
  variant?: "sections" | "grid" | "none";
};

export const Form: FC<FormProps> = ({
  children,
  className,
  variant = "grid",
  ...rest
}) => {
  return (
    <form
      className={cn(
        {
          "grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3":
            variant === "grid",
          "divide-y": variant === "sections",
        },
        className,
      )}
      {...rest}
    >
      {children}
    </form>
  );
};
