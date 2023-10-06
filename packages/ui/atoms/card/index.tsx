import type { FC, HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "../../utils/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

export const Card: FC<CardProps> = ({ children, className, ...rest }) => {
  return (
    <div className={cn("rounded-lg border p-4 shadow", className)} {...rest}>
      {children}
    </div>
  );
};
