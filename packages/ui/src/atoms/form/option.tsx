import type { DetailedHTMLProps, FC, OptionHTMLAttributes } from "react";
import clsx from "clsx";

export type OptionSize = "medium" | "large";

export type OptionProps = {
  size?: OptionSize;
} & Omit<
  DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>,
  "size"
>;

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in OptionSize]: string } = {
  medium: "p-3 ",
  large: "p-4 ",
};

export const Option: FC<OptionProps> = ({
  size = "medium",
  className = "",
  children,
  ...props
}) => {
  return (
    <option className={clsx(["", sizeMap[size], className])} {...props}>
      {children}
    </option>
  );
};

Option.displayName = "OptionField";
