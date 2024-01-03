"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";

const NumberInput = ({
  label,
  currency,
  initValue = 0,
  digit = 2,
  changeCallback,
  ...rest
}) => {
  const [amount, setAmount] = useState(initValue);

  const convertToTurkishNumber = (amount) => {
    if (typeof amount === "number") {
      return amount.toLocaleString("tr-TR", {
        minimumFractionDigits: digit,
        maximumFractionDigits: digit,
      });
    }
    // else if typeof amount === "string"
    else if (typeof amount === "string" && Number(amount)) {
      amount = Number(amount);
      return amount.toLocaleString("tr-TR", {
        minimumFractionDigits: digit,
        maximumFractionDigits: digit,
      });
    } else {
      return amount;
    }
  };

  useEffect(() => {
    setAmount(convertToTurkishNumber(initValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValue]);

  return (
    <Input
      label={label}
      inputClassName="text-right"
      currency={currency}
      {...rest}
      value={
        typeof amount === "number"
          ? amount.toLocaleString("tr-TR", {
              minimumFractionDigits: digit,
              maximumFractionDigits: digit,
            })
          : amount
      }
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
        let number = e.target.value.replace(/\./g, "").replace(",", ".");
        number = Number(number);
        setAmount(number);
        changeCallback && changeCallback(number);
      }}
    />
  );
};

export default NumberInput;
