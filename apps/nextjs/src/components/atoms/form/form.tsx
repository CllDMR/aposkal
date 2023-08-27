import type { FC, HTMLAttributes } from "react";
import clsx from "clsx";

type FormProps = HTMLAttributes<HTMLFormElement>;

export const Form: FC<FormProps> = ({ children, className, ...rest }) => {
  return (
    <form
      className={clsx(
        "grid max-w-4xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2",
        className,
      )}
      {...rest}
    >
      {children}
    </form>
  );
};
