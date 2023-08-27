import type { FC, HTMLAttributes } from "react";
import type { DateValueType } from "react-tailwindcss-datepicker";
import Datepicker from "react-tailwindcss-datepicker";

export type DateSize = "medium" | "large";

export interface DateProps
  extends Omit<
    HTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "size"
  > {
  size?: DateSize;
  value: DateValueType;
  onChange: (v: DateValueType) => void;
}

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in DateSize]: string } = {
  medium: "p-3 ",
  large: "p-4 ",
};

export const Date: FC<DateProps> = ({
  size = "medium",
  onChange,
  value,
  className,
  ...rest
}) => {
  return (
    <Datepicker
      value={value}
      onChange={onChange}
      asSingle={true}
      useRange={false}
      {...rest}
      // inputClassName="w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
    />
  );
};

Date.displayName = "DateField";
