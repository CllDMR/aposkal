import clsx from "clsx";
import type { FC } from "react";

export enum LabelVariant {
  OVERLAPPING,
  DEFAULT,
}

interface LabelProps {
  name: string;
  label: string;
  variant?: LabelVariant;
}

const VARIANT_MAPS: Record<LabelVariant, string> = {
  [LabelVariant.OVERLAPPING]:
    "absolute inline-block px-1 text-xs font-medium text-gray-900 bg-white -top-2 left-2",

  [LabelVariant.DEFAULT]: "mr-5 text-sm font-medium leading-6 text-gray-900",
};

export const Label: FC<LabelProps> = ({ label, name, variant=LabelVariant.DEFAULT }) => {
  return (
    <label
      htmlFor={name}
      className={clsx(
        VARIANT_MAPS[variant] || VARIANT_MAPS[LabelVariant.DEFAULT],
      )}
    >
      {label}
    </label>
  );
};
