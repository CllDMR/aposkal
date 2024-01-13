"use client";

import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";

import { Input } from "~/components/ui";

interface NumberInputProps {
  label: string;
  currency: string;
  initValue: number;
  digit: number;
  changeCallback: (val: number) => void;
}

export const NumberInput: FC<NumberInputProps> = ({
  label,
  // currency,
  initValue = 0,
  digit = 2,
  changeCallback,
  ...rest
}) => {
  const convertToTurkishNumber = useCallback(
    (val: number) => {
      return val.toLocaleString("tr-TR", {
        minimumFractionDigits: digit,
        maximumFractionDigits: digit,
      });
    },
    [digit],
  );

  const [amount, setAmount] = useState<string>(
    convertToTurkishNumber(initValue),
  );

  useEffect(() => {
    setAmount(convertToTurkishNumber(initValue));
  }, [convertToTurkishNumber, initValue]);

  return (
    <Input
      id=""
      name=""
      label={label}
      className="text-right"
      // currency={currency}
      {...rest}
      value={amount}
      onChange={(e) => {
        // allow only numbers and comma "," last two digits
        const regex = /^[0-9]*[.,]?[0-9]{0,4}$/;
        if (regex.test(e.target.value)) {
          setAmount(e.target.value);
          // changeCallback && changeCallback(e.target.value);
          // convert comma "," to dot "."
        }
      }}
      onBlur={(e) => {
        // delete all dot then convert comma "," to dot "." regex
        const number = e.target.value.replace(/\./g, "").replace(",", ".");
        setAmount(number);
        changeCallback(Number(number));
      }}
    />
  );
};
