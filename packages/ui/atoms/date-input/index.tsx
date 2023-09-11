"use client";

import type { FC } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// export type DateInputSize = "medium" | "large";

export interface DateInputProps {
  name: string;
  value: Date;
  onChange: (v: Date) => void;
}

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

// const sizeMap: { [key in DateSize]: string } = {
//   medium: "p-3 ",
//   large: "p-4 ",
// };

export const DateInput: FC<DateInputProps> = ({ value, onChange, name }) => {
  return (
    <DatePicker
      name={name}
      selected={value}
      onChange={onChange}
      placeholderText={new Date().toLocaleDateString("en-GB")}
    />
  );
};
