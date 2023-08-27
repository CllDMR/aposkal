import type { FC } from "react";

interface LabelProps {
  name: string;
  label: string;
}

export const Label: FC<LabelProps> = ({ label, name }) => {
  return (
    <label
      htmlFor={name}
      className="mr-5 text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
  );
};
