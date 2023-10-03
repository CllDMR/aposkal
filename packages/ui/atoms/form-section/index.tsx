import type { FC, HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

type FormSectionProps = HTMLAttributes<HTMLFieldSetElement> & {
  label: string;
  description: string;
};

export const FormSection: FC<FormSectionProps> = ({
  children,
  className,
  label,
  description,
  ...rest
}) => {
  return (
    <div className="grid grid-cols-1 py-6 first:pt-0 last:pb-0 sm:grid-cols-3">
      <div className="pb-4 sm:col-span-1 sm:pr-6">
        <span className="block font-medium">{label}</span>
        <p className="text-sm font-normal text-gray-500">{description}</p>
      </div>
      <div className="flex-1 sm:col-span-2">
        <fieldset
          className={cn(
            "grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3",
            className,
          )}
          {...rest}
        >
          {children}
        </fieldset>
      </div>
    </div>
  );
};
