"use client";

import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import type { FieldValues } from "react-hook-form";

interface Option {
  id: string;
  value: string;
}

export interface FormDropdownInputProps<_TFormValues extends FieldValues> {
  // label: string;
  // name: Path<TFormValues>;
  // rules?: RegisterOptions;
  // register?: UseFormRegister<TFormValues>;
  // errors?: Partial<DeepMap<TFormValues, FieldError>>;
  option: Option | null;
  options: Option[];
  onChange: (val: Option) => void;
  queryText: string;
  onChangeQueryText: (val: string) => void;
}

// & Omit<InputProps, "name" | "value" | "onChange" | "nullable">

export const FormDropdownInput = <TFormValues extends FieldValues>({
  // name,
  // label,
  // register,
  // rules,
  // errors,
  option,
  options,
  onChange,
  queryText,
  onChangeQueryText,
} // className,
// ...props
: FormDropdownInputProps<TFormValues>): JSX.Element => {
  // const errorMessages = get(errors, name);
  // const hasError = !!(errors && errorMessages);

  return (
    <Combobox value={option} onChange={onChange} nullable>
      <Combobox.Input
        className="focus:ring-indigo-600 w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6"
        onChange={(event) => onChangeQueryText(event.target.value)}
        displayValue={(option: Option) => option?.value}
      />
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Combobox.Options
          className={clsx(
            "rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
            { "py-1": options.length > 0 || queryText.length > 0 },
          )}
        >
          {queryText.length > 0 && (
            <Combobox.Option
              className="ui-active:bg-indigo-400 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black select-none px-3 py-2"
              value={{ id: "new", value: queryText }}
            >
              Create &quot;{queryText}&quot;
            </Combobox.Option>
          )}
          {options.map((option) => (
            <Combobox.Option
              key={option.id}
              value={option}
              className="ui-active:bg-indigo-400 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black select-none px-3 py-2"
            >
              <CheckIcon className="ui-selected:block hidden" />
              {option.value}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};
