"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import type { FieldValuesFromFieldErrors } from "@hookform/error-message";
import { ErrorMessage } from "@hookform/error-message";
import type {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldName,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { useController } from "react-hook-form";

import { FormErrorMessage, Label } from "../../atoms";

interface Option {
  id: string;
  label: string;
  value: string;
}

export interface FormDropdownInputProps<TFormValues extends FieldValues> {
  label?: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  // register?: UseFormRegister<TFormValues>;
  errors?: Partial<FieldErrors<TFormValues>>;
  control: Control<TFormValues>;
  disabled?: boolean;

  // option: Option | null;
  options: Option[];
  // onChange: (val: Option) => void;
  // queryText: string;
  // onChangeQueryText: (val: string) => void;
}

// & Omit<InputProps, "name" | "value" | "onChange" | "nullable">

export const FormDropdownInput = <TFormValues extends FieldValues>({
  name,
  label,
  // register,
  rules,
  // errors,
  control,
  disabled,
  // option,
  options, // onChange,
  // onChangeQueryText, // className,
} // queryText,
// ...props
: FormDropdownInputProps<TFormValues>): JSX.Element => {
  // const errorMessages = get(errors, name);
  // const hasError = !!(errors && errorMessages);
  const defaultValue = {
    id: "",
    label: "Select",
    value: "",
  } as PathValue<TFormValues, Path<TFormValues>>;

  const [_openCreateModal, setOpenCreateModal] = useState(false);
  // const [selected, setSelected] = useState<{
  //   id: string;
  //   value: string;
  // } | null>(null);
  const [queryText, setQueryText] = useState("");

  const filteredOptions =
    queryText === ""
      ? options
      : options.filter((option_) =>
          option_.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryText.toLowerCase().replace(/\s+/g, "")),
        );

  const {
    field: { onChange: fOnChange, value, ref, name: _name, onBlur },
    formState: { errors },
  } = useController({
    control,
    name,
    rules,
    defaultValue: defaultValue,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (val: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!val?.id) {
      /* empty */
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (val?.id === "new") {
      setOpenCreateModal(true);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else fOnChange(val.value);
  };

  return (
    <div className="">
      {label ? <Label label={label} name={name} /> : null}

      <Combobox
        value={
          filteredOptions.find(
            (filteredOption) => filteredOption.value === value,
          ) ?? defaultValue
        }
        onChange={handleOnChange}
        nullable
        defaultValue={defaultValue}
        // name={_name}
        disabled={disabled}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(option: Option) => option?.label}
              onChange={(event) => setQueryText(event.target.value)}
              onBlur={onBlur}
              name={_name}
              ref={ref}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQueryText("")}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && queryText !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : null}

              {filteredOptions.length === 0 && queryText === "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  No option found. Create new.
                </div>
              ) : null}

              {filteredOptions.length !== 0
                ? filteredOptions.map((filteredOption) => (
                    <Combobox.Option
                      key={filteredOption.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-primary-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={filteredOption}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {filteredOption.label}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-primary-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                : null}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

      <ErrorMessage
        errors={errors}
        name={
          _name as unknown as FieldName<
            FieldValuesFromFieldErrors<
              Partial<DeepMap<TFormValues, FieldError>>
            >
          >
        }
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};
