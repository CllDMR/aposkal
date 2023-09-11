"use client";

import type { FieldValuesFromFieldErrors } from "@hookform/error-message";
import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import type {
  Control,
  DeepMap,
  FieldError,
  FieldName,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useController } from "react-hook-form";

import { DateInput } from "../../atoms/date-input";
import { FormErrorMessage } from "../../atoms/form-error-message";
import type { InputProps } from "../../atoms/input";
import { Label } from "../../atoms/label";

export type FormDateInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, "name" | "type" | "onChange" | "value">;

export const FormDateInput = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  rules,
  errors,
  className, // ...props
}: FormDateInputProps<TFormValues>): JSX.Element => {
  // const errorMessages = get(errors, name);
  // const hasError = !!(errors && errorMessages);

  const {
    field: { onChange: fOnChange, value, ref: _, name: _name, onBlur: __ },
  } = useController({ control, name, rules });

  return (
    <div className={clsx("", className)} aria-live="polite">
      <div className="flex">
        <Label label={label} name={name} />
        <DateInput
          // aria-invalid={hasError}
          // className={clsx({
          //   "border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50":
          //     hasError,
          // })}
          name={_name}
          value={value}
          onChange={(v) => void fOnChange(v)}
          // {...props}
          // {...field}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={
          name as unknown as FieldName<
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
